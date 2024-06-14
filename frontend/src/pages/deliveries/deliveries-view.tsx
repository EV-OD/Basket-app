import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/deliveries/deliveriesSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const DeliveriesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { deliveries } = useAppSelector((state) => state.deliveries);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View deliveries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View deliveries')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Order</p>

            <p>{deliveries?.order?.order_date ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>DeliveryPersonnel</p>

            <p>{deliveries?.delivery_personnel?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='PickupDate'>
            {deliveries.pickup_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  deliveries.pickup_date
                    ? new Date(
                        dayjs(deliveries.pickup_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No PickupDate</p>
            )}
          </FormField>

          <FormField label='DeliveryDate'>
            {deliveries.delivery_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  deliveries.delivery_date
                    ? new Date(
                        dayjs(deliveries.delivery_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No DeliveryDate</p>
            )}
          </FormField>

          <FormField label='ProofofDelivery'>
            <SwitchField
              field={{
                name: 'proof_of_delivery',
                value: deliveries?.proof_of_delivery,
              }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/deliveries/deliveries-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

DeliveriesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_DELIVERIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DeliveriesView;
