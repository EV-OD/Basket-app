import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditOrders = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    consumer: '',

    products: [],

    order_date: new Date(),

    status: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { orders } = useAppSelector((state) => state.orders);

  const { ordersId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: ordersId }));
  }, [ordersId]);

  useEffect(() => {
    if (typeof orders === 'object') {
      setInitialValues(orders);
    }
  }, [orders]);

  useEffect(() => {
    if (typeof orders === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = orders[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [orders]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: ordersId, data }));
    await router.push('/orders/orders-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit orders')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit orders'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Consumer' labelFor='consumer'>
                <Field
                  name='consumer'
                  id='consumer'
                  component={SelectField}
                  options={initialValues.consumer}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Products' labelFor='products'>
                <Field
                  name='products'
                  id='products'
                  component={SelectFieldMany}
                  options={initialValues.products}
                  itemRef={'products'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='OrderDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.order_date
                      ? new Date(
                          dayjs(initialValues.order_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, order_date: date })
                  }
                />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='Status' id='Status' component='select'>
                  <option value='pending'>pending</option>

                  <option value='completed'>completed</option>

                  <option value='cancelled'>cancelled</option>
                </Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/orders/orders-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditOrders.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ORDERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditOrders;
