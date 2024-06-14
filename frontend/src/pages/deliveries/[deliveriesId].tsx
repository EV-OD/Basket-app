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

import { update, fetch } from '../../stores/deliveries/deliveriesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditDeliveries = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    order: '',

    delivery_personnel: '',

    pickup_date: new Date(),

    delivery_date: new Date(),

    proof_of_delivery: false,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { deliveries } = useAppSelector((state) => state.deliveries);

  const { deliveriesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: deliveriesId }));
  }, [deliveriesId]);

  useEffect(() => {
    if (typeof deliveries === 'object') {
      setInitialValues(deliveries);
    }
  }, [deliveries]);

  useEffect(() => {
    if (typeof deliveries === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = deliveries[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [deliveries]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: deliveriesId, data }));
    await router.push('/deliveries/deliveries-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit deliveries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit deliveries'}
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
              <FormField label='Order' labelFor='order'>
                <Field
                  name='order'
                  id='order'
                  component={SelectField}
                  options={initialValues.order}
                  itemRef={'orders'}
                  showField={'order_date'}
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
                  options={initialValues.delivery_personnel}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='PickupDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.pickup_date
                      ? new Date(
                          dayjs(initialValues.pickup_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, pickup_date: date })
                  }
                />
              </FormField>

              <FormField label='DeliveryDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.delivery_date
                      ? new Date(
                          dayjs(initialValues.delivery_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, delivery_date: date })
                  }
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

EditDeliveries.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DELIVERIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDeliveries;
