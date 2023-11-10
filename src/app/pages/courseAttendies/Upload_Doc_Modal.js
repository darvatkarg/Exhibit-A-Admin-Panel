import React from 'react'
import { Modal } from 'react-bootstrap'
import { BsFileEarmarkPlusFill } from 'react-icons/bs'
import { Bucket } from '../../../helpers/API/ApiData'

const Upload_Doc_Modal = ({ modal, closeModal, imageUpload, pdfs, text, loading, uploadFiles }) => {
  return (
    <div>
      <Modal
        show={modal}
        centered
        onHide={() => closeModal()}
        size="sm"
      // aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="color_blue font_size_20"
          >
            File Upload
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
              <input type="file" hidden id="fileUpload" onChange={imageUpload} />
              <label htmlFor="fileUpload" className="border border-3 rounded w-50 py-3 d-flex flex-column align-items-center justify-content-center">
                {
                  pdfs.length ?
                    <img
                      src={pdfs[0].fileURL ? pdfs[0].fileURL : Bucket + pdfs[0]}
                      className="rounded position-relative"
                      width="100px"
                      height="100px"
                    /> :
                    <BsFileEarmarkPlusFill fontSize={30} color='#3699FF' />
                }


              </label>
              <span className="" style={{ color: 'red' }}>{text}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            disabled={loading}
            onClick={() => uploadFiles()}
            className='btn btn-light-danger'
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Upload_Doc_Modal