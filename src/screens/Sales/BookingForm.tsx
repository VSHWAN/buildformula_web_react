/* eslint-disable react/no-unescaped-entities */
const BookingForm = () => {
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

          {/* 1st section */}
          <div className="booking-form-box shwan-form">
            <div className="booking-form-col-12">
              <div className="d-flex align-items-center justify-content-between">
                <h5>CUSTOMER DETAILS</h5>
                <button className="Btn btn-lightblue-primary lbps-btn mr-0">Add Customer</button>
              </div>

              <div className="form-row">
                <div className="col-12">
                  <div className="input-group has-search input-group sm-search modal-search p-0 mt-3 mb-5">
                    <div className="input-group-prepend input-group-text">
                      <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                          fill="#041D36"
                          fillOpacity="0.6"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="form-control ui-autocomplete-input"
                      id="visitors_details"
                      name="visitors_details"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col form-col-gap">
                  <label>Client Name</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col">
                  <label>Phone No</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col">
                  <label>Email ID</label>
                  <input className="form-control" type="text" />
                </div>
              </div>

              {/* <div className="d-flex mt-5">
                <div>
                  <button className="Btn btn-lightblue-primary m-0">Next</button>
                </div>
                <div>
                  <button className="table-edit-btn edit-btn-area save-btn print-icon-btn">
                    <svg
                      fill="#4872F4"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z" />
                      <circle cx="18" cy="11.5" r="1" />
                    </svg>
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          {/* 2nd section */}
          <div className="booking-form-box shwan-form mt-4">
            <div className="booking-form-col-12">
              <h5>UNIT INFO</h5>

              <div className="form-row">
                <div className="form-group col form-col-gap">
                  <label>Unit Reservation Date</label>
                  <input className="form-control" type="date" />
                </div>
                <div className="form-group col">
                  <label htmlFor="inputPassword4">Unit Info</label>
                  <input className="form-control" readOnly={true} type="text" value={'A-1-101'} />
                </div>
                <div className="form-group col">
                  <label htmlFor="inputPassword4">Super Buildup Area</label>
                  <input className="form-control" readOnly={true} type="text" value={'2500sq'} />
                </div>
                <div className="form-row">
                  <div className="form-group col form-col-gap">
                    <label>Terrace Area</label>
                    <input className="form-control" readOnly={true} type="text" value={'2500sq'} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Car Parking No</label>
                    <input className="form-control" readOnly={true} type="text" value={'2,19'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd section */}
          <div className="booking-form-box shwan-form mt-4">
            <div className="booking-form-col-12">
              <h5>RATE CALCULATION</h5>
              <div className="form-row">
                <div className="form-row">
                  <div className="form-group col form-col-gap">
                    <label>Calculation Method</label>
                    <div className="rd-grp form-check-inline">
                      <label className="rd-container mr-4">
                        Rate Based
                        <input className="filem-check" name="radio" type="radio" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="rd-container mx-5">
                        Fixed Amount
                        <input className="filem-check" name="radio" type="radio" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Rate Based */}
              <div>
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
                        <input className="form-control mb-2" placeholder="Amount" type="text" />
                        <input className="form-control" placeholder="%" type="text" />
                      </td>
                      <td>
                        <input readOnly className="form-control" type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Fixed Amount Based */}
              <div>
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
                      <td>
                        <input className="form-control" type="text" />
                      </td>
                      <td>
                        <input className="form-control" type="text" />
                      </td>
                      <td>
                        <input className="form-control mb-2" placeholder="Amount" type="text" />
                        <input className="form-control" placeholder="%" type="text" />
                      </td>
                      <td>
                        <input readOnly className="form-control" type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                    <th>Amount</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Parking Basic Charges </td>
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
                        <input className="form-control" type="text" />
                      </td>
                      <td>
                        <input className="form-control mb-2" placeholder="Amount" type="text" />
                        <input className="form-control" placeholder="%" type="text" />
                      </td>
                      <td>
                        <input readOnly className="form-control" type="text" />
                      </td>
                    </tr>
                    {/* total */}
                    <tr>
                      <td className="text-right font-weight-bold" colSpan={6}>
                        Other Charges Total
                      </td>
                      <td>Rs 10000000</td>
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
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col-3">
                  <label>Amt</label>
                  <input className="form-control" type="text" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label>Stamp Duty</label>
                </div>
                <div className="form-group col-2  pr-4">
                  <label>%</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col-3">
                  <label>Amt</label>
                  <input className="form-control" type="text" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label>Registration</label>
                </div>
                <div className="form-group col-2  pr-4">
                  <label>%</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col-3">
                  <label>Amt</label>
                  <input className="form-control" type="text" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-3 form-col-gap">
                  <label>Taxes Total</label>
                </div>
                <div className="form-group col-2  pr-4">
                  <label>%</label>
                  <input className="form-control" type="text" />
                </div>
                <div className="form-group col-3">
                  <label>Amt</label>
                  <input className="form-control" type="text" />
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
                    <th>Amount</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Some Extra Charges need to be added here</td>
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
                        <input className="form-control mb-2" type="text" />
                      </td>
                      <td>
                        <input className="form-control mb-2" type="text" />
                      </td>
                      <td>
                        <input className="form-control mb-2" placeholder="Amount" type="text" />
                        <input className="form-control" placeholder="%" type="text" />
                      </td>
                      <td>
                        <input readOnly className="form-control mb-2" type="text" />
                      </td>
                    </tr>
                    {/* total */}
                    <tr>
                      <td className="text-right font-weight-bold" colSpan={6}>
                        Other Charges Total
                      </td>
                      <td>Rs 10000000</td>
                    </tr>
                  </tbody>
                </table>
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
                    <th>Installment Amount</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>Installment Will be here</td>
                      <td>
                        <input type="text" className="form-control" />
                      </td>
                      <td><input type="text" className="form-control" /></td>
                      <td><input type="text" className="form-control" /></td>
                      <td><input type="text" className="form-control" /></td>
                      <td><input type="text" className="form-control" /></td>
                      <td><input type="text" className="form-control" readOnly/></td>
                    </tr>
                    {/* total */}
                    <tr>
                      <td className="text-right font-weight-bold" colSpan={6}>
                        Other Charges Total
                      </td>
                      <td>Rs 10000000</td>
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
                  <select className="form-control">
                    <option value="0">Select T&C</option>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                  </select>
                </div>
              </div>

              <textarea className="form-control" rows={4}></textarea>
            </div>

            <div className="booking-form-col-12">
              <div className="form-row mb-4">
                <div className="bookingform-footer mt-5">
                  <button className="Btn btn-lightblue-primary" type="button">
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
        </div>
      </section>
    </>
  );
};

export default BookingForm;
