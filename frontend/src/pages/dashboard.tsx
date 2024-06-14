import * as icon from '@mdi/js';
import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import type { ReactElement } from 'react';
import LayoutAuthenticated from '../layouts/Authenticated';
import SectionMain from '../components/SectionMain';
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton';
import BaseIcon from '../components/BaseIcon';
import { getPageTitle } from '../config';
import Link from 'next/link';

import { hasPermission } from '../helpers/userPermissions';
import { fetchWidgets } from '../stores/roles/rolesSlice';
import { WidgetCreator } from '../components/WidgetCreator/WidgetCreator';
import { SmartWidget } from '../components/SmartWidget/SmartWidget';

import { useAppDispatch, useAppSelector } from '../stores/hooks';
const Dashboard = () => {
  const dispatch = useAppDispatch();

  const [users, setUsers] = React.useState('Loading...');
  const [deliveries, setDeliveries] = React.useState('Loading...');
  const [orders, setOrders] = React.useState('Loading...');
  const [products, setProducts] = React.useState('Loading...');
  const [reviews, setReviews] = React.useState('Loading...');
  const [subscriptions, setSubscriptions] = React.useState('Loading...');
  const [roles, setRoles] = React.useState('Loading...');
  const [permissions, setPermissions] = React.useState('Loading...');

  const [widgetsRole, setWidgetsRole] = React.useState({
    role: { value: '', label: '' },
  });
  const { currentUser } = useAppSelector((state) => state.auth);
  const { isFetchingQuery } = useAppSelector((state) => state.openAi);

  const { rolesWidgets, loading } = useAppSelector((state) => state.roles);

  async function loadData() {
    const entities = [
      'users',
      'deliveries',
      'orders',
      'products',
      'reviews',
      'subscriptions',
      'roles',
      'permissions',
    ];
    const fns = [
      setUsers,
      setDeliveries,
      setOrders,
      setProducts,
      setReviews,
      setSubscriptions,
      setRoles,
      setPermissions,
    ];

    const requests = entities.map((entity, index) => {
      if (hasPermission(currentUser, `READ_${entity.toUpperCase()}`)) {
        return axios.get(`/${entity.toLowerCase()}/count`);
      } else {
        fns[index](null);
        return Promise.resolve({ data: { count: null } });
      }
    });

    Promise.allSettled(requests).then((results) => {
      results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
          fns[i](result.value.data.count);
        } else {
          fns[i](result.reason.message);
        }
      });
    });
  }

  async function getWidgets(roleId) {
    await dispatch(fetchWidgets(roleId));
  }
  React.useEffect(() => {
    if (!currentUser) return;
    loadData().then();
    setWidgetsRole({
      role: {
        value: currentUser?.app_role?.id,
        label: currentUser?.app_role?.name,
      },
    });
  }, [currentUser]);

  React.useEffect(() => {
    if (!currentUser || !widgetsRole?.role?.value) return;
    getWidgets(widgetsRole?.role?.value || '').then();
  }, [widgetsRole?.role?.value]);

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={icon.mdiChartTimelineVariant}
          title='Overview'
          main
        >
          {''}
        </SectionTitleLineWithButton>

        {hasPermission(currentUser, 'CREATE_ROLES') && (
          <WidgetCreator
            currentUser={currentUser}
            isFetchingQuery={isFetchingQuery}
            setWidgetsRole={setWidgetsRole}
            widgetsRole={widgetsRole}
          />
        )}
        {!!rolesWidgets.length &&
          hasPermission(currentUser, 'CREATE_ROLES') && (
            <p className='text-gray-500 dark:text-gray-400 mb-4'>
              {`${widgetsRole?.role?.label || 'Users'}'s widgets`}
            </p>
          )}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6 grid-flow-dense'>
          {(isFetchingQuery || loading) && (
            <div className='rounded dark:bg-dark-900 text-lg leading-tight text-gray-500 flex items-center bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
              <BaseIcon
                className='text-blue-500 animate-spin mr-5'
                w='w-16'
                h='h-16'
                size={48}
                path={icon.mdiLoading}
              />{' '}
              Loading widgets...
            </div>
          )}

          {rolesWidgets &&
            rolesWidgets.map((widget) => (
              <SmartWidget
                key={widget.id}
                userId={currentUser?.id}
                widget={widget}
                roleId={widgetsRole?.role?.value || ''}
                admin={hasPermission(currentUser, 'CREATE_ROLES')}
              />
            ))}
        </div>

        {!!rolesWidgets.length && <hr className='my-6' />}

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6'>
          {hasPermission(currentUser, 'READ_USERS') && (
            <Link href={'/users/users-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Users
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {users}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiAccountGroup || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_DELIVERIES') && (
            <Link href={'/deliveries/deliveries-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Deliveries
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {deliveries}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiTruck || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_ORDERS') && (
            <Link href={'/orders/orders-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Orders
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {orders}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiCart || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PRODUCTS') && (
            <Link href={'/products/products-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Products
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {products}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiFoodApple || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_REVIEWS') && (
            <Link href={'/reviews/reviews-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Reviews
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {reviews}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiStar || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_SUBSCRIPTIONS') && (
            <Link href={'/subscriptions/subscriptions-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Subscriptions
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {subscriptions}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiCalendar || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_ROLES') && (
            <Link href={'/roles/roles-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Roles
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {roles}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={
                        icon.mdiShieldAccountVariantOutline || icon.mdiTable
                      }
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {hasPermission(currentUser, 'READ_PERMISSIONS') && (
            <Link href={'/permissions/permissions-list'}>
              <div className='rounded dark:bg-dark-900 bg-white border border-pavitra-400 dark:border-dark-700 p-6'>
                <div className='flex justify-between align-center'>
                  <div>
                    <div className='text-lg leading-tight text-gray-500 dark:text-gray-400'>
                      Permissions
                    </div>
                    <div className='text-3xl leading-tight font-semibold'>
                      {permissions}
                    </div>
                  </div>
                  <div>
                    <BaseIcon
                      className='text-blue-500'
                      w='w-16'
                      h='h-16'
                      size={48}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      path={icon.mdiShieldAccountOutline || icon.mdiTable}
                    />
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </SectionMain>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
