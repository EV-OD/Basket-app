import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/deliveries/deliveriesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  order: '',

  delivery_personnel: '',

  pickup_date: '',

  delivery_date: '',

  proof_of_delivery: false,
};

const DeliveriesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // get from url params
  const { dateRangeStart, dateRangeEnd } = router.query;

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/deliveries/deliveries-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
              dateRangeStart && dateRangeEnd
                ? {
                    ...initialValues,
                    pickup_date:
                      moment(dateRangeStart).format('YYYY-MM-DDTHH:mm'),
                    delivery_date:
                      moment(dateRangeEnd).format('YYYY-MM-DDTHH:mm'),
                  }
                : initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Order' labelFor='order'>
                <Field
                  name='order'
                  id='order'
                  component={SelectField}
                  options={[]}
                  itemRef={'orders'}
                ></Field>
              </FormField>

              <FormField
                label='DeliveryPersonnel'
                labelFor='delivery_personnel'
              >
                <Field
                  name='delivery_personnel'
                  id='delivery_personnel'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='PickupDate'>
                <Field
                  type='datetime-local'
                  name='pickup_date'
                  placeholder='PickupDate'
                />
              </FormField>

              <FormField label='DeliveryDate'>
                <Field
                  type='datetime-local'
                  name='delivery_date'
                  placeholder='DeliveryDate'
                />
              </FormField>

              <FormField label='ProofofDelivery' labelFor='proof_of_delivery'>
                <Field
                  name='proof_of_delivery'
                  id='proof_of_delivery'
                  component={SwitchField}
                ></Field>
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
                  onClick={() => router.push('/deliveries/deliveries-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

DeliveriesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_DELIVERIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default DeliveriesNew;
