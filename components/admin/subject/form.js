import React from "react";
import ReactModal from "react-modal";
import Select from "react-select";

export default function SubjectDetail(props) {
  const { model, refreshEditForm, setRefreshEditForm } = props;

  const options = [
    {
      label: "Khoa công nghệ thông tin",
      value: "1",
    },
    {
      label: "Khoa Viễn Thông",
      value: "2",
    },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <ReactModal
      isOpen={model.show}
      contentLabel="Thông tin lớp"
      style={customStyles}
    >
      <div>
        <h3>{model.model.className}</h3>
        <form>
          <div>
            <label>Khoa</label>
            <Select
              options={options}
              defaultValue={{
                label: "Khoa công nghệ thông tin",
                value: "1",
              }}
            ></Select>
          </div>
          <div>
            <label>Mã lớp</label>
            <input
              style={{ width: "100%" }}
              defaultValue={model.model.classCode}
            ></input>
          </div>
          <div>
            <label>Tên lớp</label>
            <input
              style={{ width: "100%" }}
              defaultValue={model.model.className}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button>Lưu</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setRefreshEditForm(!refreshEditForm);
              }}
            >
              Thoát
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
