/* eslint-disable react/no-unescaped-entities */
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSyncedFields } from 'hooks/useDiscountCalculator';
import { useEffect, useMemo, useState } from 'react';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import {
  getOtherChargesList,
  getTermsnConditions,
  getUnitInfo,
  getUnitParkingInfo,
  getVisitorsList,
} from 'redux/sales';
import { ExtraCharge, IVisitor } from 'redux/sales/salesInterface';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { DISTRIBUTION_METHOD } from 'utils/constant';

import AddCustomerModal from './AddCustomerModal';

const BookingForm = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<IVisitor>();
  const [extraCharges, setExtraCharges] = useState<ExtraCharge[]>([
    {
      extra_charges_no: 1,
      extra_charges_title: '',
      extra_charges_distribution_method: '',
      extra_charges_area: 0,
      extra_charges_rate: 0,
      extra_charges_disc_amt: 0,
      extra_charges_disc_per: 0,
      extra_charges_amt: 0,
      extra_charges_total: 0,
      extra_charges_base: 0,
    },
  ]);
  const [baseAmount, setBaseAmount] = useState<number>();
  const [terms, setTerms] = useState<string>();

  const toggleModal = () => setShow(!show);
  const unitId = 28;

  // visitors list
  const { visitorList, unitInfo, unitParkingInfo, otherChargesList, termsList } = useAppSelector(
    s => s.sales,
  );
  // unitValues
  const unitInfoValues = useMemo(() => {
    return unitInfo?.booking_unit_sheet_towers_data?.find(e => e.project_main_units_id === unitId);
  }, [unitInfo?.booking_unit_sheet_towers_data]);
  // parkingInfo
  const unitParkingInfoValues = useMemo(() => {
    return unitParkingInfo?.all_parking_units?.filter(e => e.allotment_data === unitId.toString());
  }, [unitParkingInfo?.all_parking_units]);
  // customers options
  const customerOptions = useMemo(() => {
    return visitorList?.map(e => ({
      label: `${e.first_name} ${e.last_name} - [${e.phone}]`,
      value: e.id,
      details: e,
    }));
  }, [visitorList]);
  // t&c
  const termsOptions = useMemo(() => {
    return termsList?.map(e => ({
      label: e.title,
      value: e.id,
      details: e.description,
    }));
  }, [termsList]);

  // extra charges update & delete
  const handleUpdateExtraCharge = (index: number, field: string, value: string) => {
    setExtraCharges(prevExtraCharges => {
      const updatedExtraCharges = [...prevExtraCharges];
      updatedExtraCharges[index][field] = value;
      return updatedExtraCharges;
    });
  };
  const handleDeleteExtraCharge = (index: number) => {
    setExtraCharges(prevExtraCharges => {
      const updatedExtraCharges = [...prevExtraCharges];
      updatedExtraCharges.splice(index, 1);
      return updatedExtraCharges;
    });
  };

  const extraChargeRow = (i, x) => {
    const onChangeAmount = e => {
      const { valueAsNumber: amount } = e.target;

      const percent = ((amount / x.extra_charges_base) * 100).toFixed(2);
      handleUpdateExtraCharge(i, 'extra_charges_disc_per', percent);
    };

    const onChangePercent = e => {
      const { valueAsNumber: percent } = e.target;

      const amount = ((x.extra_charges_base * percent) / 100).toFixed(2);
      handleUpdateExtraCharge(i, 'extra_charges_disc_amt', amount);
    };

    return (
      <tr>
        <td>{i + 1}</td>
        <td>
          <input
            className="form-control mb-2"
            type="text"
            value={x?.extra_charges_title}
            onChange={e => handleUpdateExtraCharge(i, 'extra_charges_title', e.target.value)}
          />
        </td>
        <td>
          <select
            className="form-control"
            onChange={e =>
              handleUpdateExtraCharge(i, 'extra_charges_distribution_method', e.target.value)
            }
          >
            {DISTRIBUTION_METHOD?.map((e, index) => {
              return (
                <option key={index} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </td>
        <td>
          <input
            className="form-control mb-2"
            type="number"
            value={x.extra_charges_area}
            onChange={e => handleUpdateExtraCharge(i, 'extra_charges_area', e.target.value)}
          />
        </td>
        <td>
          <input
            className="form-control mb-2"
            type="number"
            value={x.extra_charges_rate}
            onChange={e => {
              handleUpdateExtraCharge(
                i,
                'extra_charges_base',
                x.extra_charges_area * e.target.value,
              );
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_area * e.target.value,
              );
              handleUpdateExtraCharge(i, 'extra_charges_rate', e.target.value);
            }}
          />
        </td>
        <td>
          <input
            className="form-control mb-2"
            name="extra_charges_disc_amt"
            placeholder="Amount"
            type="number"
            value={x.extra_charges_disc_amt}
            onKeyUp={e => {
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_base - e.target.value,
              );
            }}
            onChange={e => {
              onChangeAmount(e);
              handleUpdateExtraCharge(i, '', e.target.value);
            }}
          />
          <input
            className="form-control"
            name="extra_charges_disc_per"
            placeholder="%"
            type="number"
            value={x.extra_charges_disc_per}
            onChange={e => {
              onChangePercent(e);
              handleUpdateExtraCharge(i, 'extra_charges_disc_per', e.target.value);
            }}
            onKeyUp={e =>{
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_base - x.extra_charges_disc_amt,
              );
            }}
          />
        </td>
        <td>
          <input className="form-control mb-2" type="number" value={x.extra_charges_total} />
        </td>
        <td>
          <button
            className="add-comp-btn m-0 acount-act-btn red-common"
            type="button"
            onClick={() => handleDeleteExtraCharge(i)}
          >
            <svg
              fill="none"
              height="10"
              viewBox="0 0 6 8"
              width="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.498698 6.91667C0.498698 7.375 0.873698 7.75 1.33203 7.75H4.66537C5.1237 7.75 5.4987 7.375 5.4987 6.91667V1.91667H0.498698V6.91667ZM5.91537 0.666667H4.45703L4.04036 0.25H1.95703L1.54036 0.666667H0.0820312V1.5H5.91537V0.666667Z"
                fill="#FF5D5D"
              ></path>
            </svg>
          </button>
        </td>
      </tr>
    );
  };

  const handleAddData = () => {
    setExtraCharges([
      ...extraCharges,
      {
        extra_charges_no: extraCharges.length + 1,
        extra_charges_title: '',
        extra_charges_distribution_method: '',
        extra_charges_area: undefined,
        extra_charges_rate: undefined,
        extra_charges_disc_amt: undefined,
        extra_charges_disc_per: undefined,
        extra_charges_amt: undefined,
        extra_charges_total: undefined,
        extra_charges_base: undefined,
      },
    ]);
  };

  useEffect(() => {
    dispatch(
      getVisitorsList({
        project_id: 18,
      }),
    );
    dispatch(
      getUnitInfo({
        project_id: 18,
        tower_id: 1,
      }),
    );
    dispatch(
      getUnitParkingInfo({
        project_id: 18,
      }),
    );
    dispatch(
      getOtherChargesList({
        project_id: 18,
        unit_id: unitId,
      }),
    );
    dispatch(
      getTermsnConditions({
        project_id: 18,
      }),
    );
  }, []);

  const initialValues = {
    project_id: 18,
    unit_id: 28,
    visitors_id: customerDetails?.id,
    unit_reserved_date: dayjs().format('YYYY-MM-DD'),
    parking_no: unitParkingInfoValues?.map(e => e.id).toString(),
    calculation_method: '',
    basic_rate_no: 1,
    basic_rate_description: 'Basic rate of unit',
    basic_rate_area: unitInfoValues?.super_build_up_area || 0,
    basic_rate: undefined,
    basic_rate_disc_amt: 0,
    basic_rate_disc_per: 0,
    basic_rate_basic_amount: undefined,
    custom_payment_remark_id: 0,
    custom_payment_remark: '',
    extra_charges: extraCharges,
    gst_per: 0,
    gst_amt: '',
    stampduty_per: '',
    stampduty_amount: '',
    reg_per: '',
    reg_amount: '',
    taxes_per: '',
    taxes_amount: '',
  };

  const handleSubmit = values => {
    // const {
    //   project_id,
    //   unit_id,
    //   visitors_id,
    //   unit_reserved_date,
    //   parking_no,
    //   calculation_method,
    //   basic_rate_no,
    //   basic_rate_description,
    //   basic_rate_area,
    //   basic_rate,
    //   basic_rate_disc_amt,
    //   basic_rate_disc_per,
    //   basic_rate_basic_amount,
    // } = values;
    console.log('🚀 ~ file: BookingForm.tsx:93 ~ handleSubmit ~ values:', values);
    // dispatch(
    //   addBooking({
    //     project_bookings_temp_id: 0,
    //     project_id,
    //     unit_id,
    //     visitors_id,
    //     unit_reserved_date,
    //     parking_no,
    //     calculation_method,
    //     basic_rate_no,
    //     basic_rate_description,
    //     basic_rate_area,
    //     basic_rate,
    //     basic_rate_disc_amt,
    //     basic_rate_disc_per,
    //     basic_rate_basic_amount,
    //     other_charges: [],
    //     other_charges_total: 0,
    //     sub_total_amt: 0,
    //     total_disc: 0,
    //     disc_remarks: '',
    //     gst_per: 0,
    //     gst_amt: 0,
    //     stampduty_per: 0,
    //     stampduty_amount: 0,
    //     reg_per: 0,
    //     reg_amount: 0,
    //     total_gove_tax: '',
    //     extra_charges: rows,
    //     extra_charges_total: 0,
    //     property_final_amount: 0,
    //     is_loan: '',
    //     loan_amt: 0,
    //     bank: 0,
    //     loan_remarks: '',
    //     installments: [],
    //     custom_payment_total_amount: 0,
    //     custom_payment_remark_id: 0,
    //     custom_payment_remark: '',
    //   }),
    // );
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const { values, setFieldValue, handleChange, handleBlur } = formik;

  const newbaseAmount = 500000;

  const discountSyncedFields = useSyncedFields(
    baseAmount,
    'basic_rate_disc_amt',
    'basic_rate_disc_per',
    setFieldValue,
  );

  // govt Taxes
  const gstSyncedFields = useSyncedFields(newbaseAmount, 'gst_amt', 'gst_per', () => {
    setFieldValue;
  });

  const stampDutySyncedFields = useSyncedFields(
    newbaseAmount,
    'stampduty_amount',
    'stampduty_per',
    setFieldValue,
  );

  const registrationSyncedFields = useSyncedFields(
    newbaseAmount,
    'reg_amount',
    'reg_per',
    setFieldValue,
  );

  const taxesTotalSyncedFields = useSyncedFields(newbaseAmount, 'taxes_amount', 'taxes_per', () => {
    setFieldValue;
  });

  useEffect(() => {
    const { basic_rate_area = 0, basic_rate = 0 } = values;

    const basic_rate_total = basic_rate_area * basic_rate;
    setBaseAmount(basic_rate_total);
  }, [values]);

  useEffect(() => {
    const { basic_rate_disc_amt = 0 } = values;
    setFieldValue('basic_rate_basic_amount', (baseAmount - basic_rate_disc_amt).toFixed(2));
  }, [baseAmount, setFieldValue, values, values.basic_rate_disc_amt, values.basic_rate_disc_per]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      basic_rate: 0,
      basic_rate_disc_amt: 0,
      basic_rate_disc_per: 0,
      basic_rate_basic_amount: 0,
    });
  }, [values.calculation_method]);

  return (
    <>
      <div className="header-bar">
        <div className="page-header">
          <button className="header-back-btn">
            <svg
              fill="none"
              height="12"
              viewBox="0 0 18 12"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z"
                fill="#041D36"
              ></path>
            </svg>
          </button>
          <h2 className="mx-4">Booking Form</h2>
        </div>
        <div className="booking-form-header new-booking-header ml-auto px-2 py-3">
          <div className="booking-timer">
            <p>
              Time Left: <span>27 : 29</span>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <section className="booking-form-sec pt-0">
        <div className="booking-form-row">
          <div className="booking-form-row-header">
            <h4>Customer Details</h4>
          </div>

          <Form onSubmit={formik.handleSubmit}>
            {/* 1st section */}
            <AddCustomerModal handleClose={toggleModal} show={show} />
            <div className="booking-form-box shwan-form">
              <div className="booking-form-col-12">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>CUSTOMER DETAILS</h5>
                  <button className="Btn btn-lightblue-primary lbps-btn mr-0" onClick={toggleModal}>
                    Add Customer
                  </button>
                </div>

                <div className="form-row">
                  <div className="col-12">
                    <Select
                      closeMenuOnSelect={true}
                      options={customerOptions}
                      placeholder="Existing Customer"
                      styles={{
                        container: base => ({
                          ...base,
                          width: '31%',
                          marginTop: 10,
                          marginBottom: 50,
                        }),
                      }}
                      onChange={e => setCustomerDetails(e.details)}
                    />
                  </div>
                </div>

                {customerDetails ? (
                  <div className="form-row">
                    <div className="form-group col form-col-gap">
                      <label>Client Name</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={`${customerDetails.first_name} ${customerDetails.last_name}`}
                      />
                    </div>
                    <div className="form-group col">
                      <label>Phone No</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={customerDetails.phone}
                      />
                    </div>
                    <div className="form-group col">
                      <label>Email ID</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={customerDetails.email || ''}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 2nd section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>UNIT INFO</h5>

                <div className="form-row">
                  <div className="form-group col form-col-gap">
                    <label>Unit Reservation Date</label>
                    <input
                      className="form-control"
                      name="unit_reserved_date"
                      type="date"
                      value={formik.values.unit_reserved_date}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="inputPassword4">Unit Info</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      type="text"
                      value={unitInfoValues?.title}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="inputPassword4">Super Buildup Area</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      type="text"
                      value={unitInfoValues?.super_build_up_area}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col form-col-gap">
                      <label>Terrace Area</label>
                      <input
                        className="form-control"
                        readOnly={true}
                        type="text"
                        value={'pending'}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <label>Car Parking No</label>
                      <input
                        className="form-control"
                        name="parking_no"
                        readOnly={true}
                        type="text"
                        value={formik.values.parking_no}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>RATE CALCULATION</h5>
                <div className="form-row ml-3">
                  <div className="form-group col form-col-gap">
                    <div className="row w-100">
                      <p>
                        <b>Calculation Method</b>
                      </p>
                      <Col md={2}>
                        <Form.Check
                          id="RateBased"
                          label="Rate Based"
                          name="calculation_method"
                          type="radio"
                          value={'rate_base'}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={2}>
                        <Form.Check
                          id="fixedRate"
                          label="Fixed Amount"
                          name="calculation_method"
                          type="radio"
                          value={'fixed_amount'}
                          onChange={handleChange}
                        />
                      </Col>
                    </div>
                  </div>
                </div>
                {formik.values.calculation_method === 'rate_base' ? (
                  <div>
                    {/* Rate Based */}
                    <table className="table">
                      <thead>
                        <th>Sr No</th>
                        <th>Description</th>
                        <th>Area</th>
                        <th>Rate</th>
                        <th>Discount</th>
                        <th>Basic Amount</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Basic rate of unit</td>
                          <td>
                            <input
                              className="form-control"
                              name="basic_rate_area"
                              type="number"
                              value={values.basic_rate_area}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              name="basic_rate"
                              type="text"
                              value={values.basic_rate}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control mb-2"
                              name="basic_rate_disc_amt"
                              placeholder="Amount"
                              type="number"
                              value={values.basic_rate_disc_amt}
                              onBlur={handleBlur}
                              onChange={discountSyncedFields.onChangeAmount}
                            />
                            <input
                              className="form-control"
                              name="basic_rate_disc_per"
                              placeholder="%"
                              type="number"
                              value={values.basic_rate_disc_per}
                              onBlur={handleBlur}
                              onChange={discountSyncedFields.onChangePercent}
                            />
                          </td>
                          <td>
                            <input
                              readOnly
                              className="form-control"
                              name="basic_rate_basic_amount"
                              type="text"
                              value={values.basic_rate_basic_amount}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : formik.values.calculation_method === 'fixed_amount' ? (
                  <div>
                    {/* Fixed Amount Based */}
                    <table className="table">
                      <thead>
                        <th>Sr No</th>
                        <th>Description</th>
                        <th>Rate</th>
                        <th>Discount</th>
                        <th>Basic Amount</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Basic rate of unit</td>
                          <td>
                            <input
                              className="form-control"
                              name="basic_rate"
                              placeholder="Amount"
                              type="text"
                              value={values.basic_rate}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control mb-2"
                              name="basic_rate_disc_amt"
                              placeholder="Amount"
                              type="text"
                              value={values.basic_rate_disc_amt}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <input
                              className="form-control"
                              name="basic_rate_disc_per"
                              placeholder="%"
                              type="text"
                              value={values.basic_rate_disc_per}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              readOnly
                              className="form-control"
                              name="basic_rate_basic_amount"
                              type="text"
                              value={values.basic_rate_basic_amount}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : undefined}
              </div>
            </div>

            {/* 4th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>OTHER CHARGES</h5>

                <div>
                  <table className="table">
                    <thead>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Distribution Method</th>
                      <th>Area</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th className="text-right">Amount</th>
                    </thead>
                    <tbody>
                      {otherChargesList?.other_charge_unit_rates?.map(e => {
                        return (
                          <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.title}</td>
                            <td>
                              <select className="form-control">
                                <option value="">Equally with all installments</option>
                                <option value="">Proportionately with all installment</option>
                                <option value="">
                                  Proportionately with all installment(Except First)
                                </option>
                                <option value="">Connect with last installment</option>
                                <option value="">Don't connect with installment</option>
                              </select>
                            </td>
                            <td>
                              <input className="form-control" type="text" />
                            </td>
                            <td>
                              <input
                                className="form-control"
                                name="calculation_method"
                                type="text"
                                value={'rate_base'}
                                onChange={formik.handleChange}
                              />
                            </td>
                            <td>
                              <input
                                className="form-control mb-2"
                                placeholder="Amount"
                                type="text"
                              />
                              <input className="form-control" placeholder="%" type="text" />
                            </td>
                            <td>
                              <input readOnly className="form-control" type="text" />
                            </td>
                          </tr>
                        );
                      })}

                      {/* total */}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={6}>
                          Other Charges Total
                        </td>
                        <td className="text-right">₹ 10000000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 5th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-6">
                <h5>OVERALL DISCOUNT</h5>

                <div className="form-row">
                  <div className="form-group col form-col-gap">
                    <label>Sub Total Amount (Basic Amt + Other Charges)</label>
                    <input readOnly className="form-control" type="text" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Total Discount</label>
                    <input className="form-control" type="text" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Discount Remark</label>
                    <textarea className="form-control" rows={3} />
                  </div>
                </div>
              </div>
            </div>

            {/* 6th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-6">
                <h5>GOVERNMENT TAXES</h5>

                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>GST</label>
                  </div>
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="gst_per"
                      type="text"
                      value={values.gst_per}
                      onChange={gstSyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="gst_amt"
                      type="text"
                      value={values.gst_amt}
                      onChange={gstSyncedFields.onChangeAmount}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>Stamp Duty</label>
                  </div>
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="stampduty_per"
                      type="text"
                      value={values.stampduty_per}
                      onChange={stampDutySyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="stampduty_amount"
                      type="text"
                      value={values.stampduty_amount}
                      onChange={stampDutySyncedFields.onChangeAmount}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>Registration</label>
                  </div>
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="reg_per"
                      type="text"
                      value={values.reg_per}
                      onChange={registrationSyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="reg_amount"
                      type="text"
                      value={values.reg_amount}
                      onChange={registrationSyncedFields.onChangeAmount}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>Taxes Total</label>
                  </div>
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="taxes_per"
                      type="text"
                      value={values.taxes_per}
                      onChange={taxesTotalSyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="taxes_amount"
                      type="text"
                      value={values.taxes_amount}
                      onChange={taxesTotalSyncedFields.onChangeAmount}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 7th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>EXTRA CHARGES</h5>

                <div>
                  <table className="table">
                    <thead>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Distribution Method</th>
                      <th>Area</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th className="text-right">Amount</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {extraCharges?.map((x, i) => extraChargeRow(i, x))}
                      {/* total */}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={6}>
                          Other Charges Total
                        </td>
                        <td className="text-right">Rs 10000000</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row w-100 justify-content-end">
                    <button
                      className="Btn btn-lightblue-primary lbps-btn ml-auto mr-0"
                      onClick={handleAddData}
                    >
                      Add More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 8th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>SUMMARY</h5>

                <div className="row">
                  <div className="col-4">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Basic Amount</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Other Charges Total</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Total Discount (Sale Deed Amount)</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Government Taxes Total</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Extra Charges</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Property Final Amount</td>
                          <td>5000000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* 9th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-6">
                <h5>LOAN DETAILS</h5>

                <div className="form-row">
                  <div className="col-6">
                    <label>Do you wish to take a loan?</label>
                    <div className="form-row">
                      <div className="col-6">
                        <div className="rd-grp form-check-inline">
                          <label className="rd-container check-yes">
                            Yes
                            <input checked={true} name="radio" type="radio" />
                            <span className="checkmark"></span>
                          </label>
                          <label className="rd-container check-no">
                            No
                            <input name="radio" type="radio" />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-row mt-3">
                  <div className="form-group col form-col-gap">
                    <label>Loan Amount</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group col">
                    <label>Bank</label>
                    <select className="form-control">
                      <option value="">SBI</option>
                      <option value="">HDFC</option>
                      <option value="">Kotak</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Remarks</label>
                    <textarea className="form-control" cols={20} id="" name="" rows={10}></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* 10th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>PAYMENT SCHEDULE</h5>

                <div>
                  <table className="table">
                    <thead>
                      <th>Sr No</th>
                      <th>Installment Name</th>
                      <th>Due Date</th>
                      <th>%</th>
                      <th>Basic Amount</th>
                      <th>Other Charges Amount</th>
                      <th>GST</th>
                      <th className="text-right">Installment Amount</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>01</td>
                        <td>Installment Will be here</td>
                        <td>
                          <input className="form-control" type="date" />
                        </td>
                        <td>
                          <input className="form-control" type="text" />
                        </td>
                        <td>
                          <input className="form-control" type="text" />
                        </td>
                        <td>
                          <input className="form-control" type="text" />
                        </td>
                        <td>
                          <input className="form-control" type="text" />
                        </td>
                        <td>
                          <input readOnly className="form-control" type="text" />
                        </td>
                      </tr>
                      {/* total */}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={7}>
                          Other Charges Total
                        </td>
                        <td className="text-right">Rs 10000000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 11th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>TERMS & CONDITIONS</h5>

                <div className="form-row mb-4">
                  <div className="col-4">
                    <label>Select T&C Template</label>
                    <Select
                      closeMenuOnSelect={true}
                      options={termsOptions}
                      placeholder="Select Terms & Conditions"
                      styles={{
                        container: base => ({
                          ...base,
                          marginTop: 10,
                          marginBottom: 50,
                        }),
                      }}
                      onChange={e => setTerms(e.details)}
                    />
                  </div>
                  <div className="col-10 px-0"></div>
                </div>
              </div>

              <div className="booking-form-col-12">
                <div className="form-row mb-4">
                  <div className="bookingform-footer mt-5">
                    <button className="Btn btn-lightblue-primary" type="submit">
                      Save
                    </button>
                    <button
                      className="Btn btn-lightblue-primary lbps-btn"
                      data-dismiss="modal"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default BookingForm;
