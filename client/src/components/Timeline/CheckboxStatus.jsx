import React, { useState } from 'react';
import { updateTaskStatus } from '../../service/taskService';

const CheckboxStatus = ({ workspaceID, projectID, status, taskID }) => {
  const [isChecked, setIsChecked] = useState(status === 1);

  const handleCheckboxChange = () => {
    const newCheckedStatus = !isChecked;
    setIsChecked(newCheckedStatus);
    try {
      updateTaskStatus(projectID, workspaceID, taskID, newCheckedStatus? 1 : 0);
      alert("Cập nhật thành công!");
    } catch (error) {
      alert("Xảy ra lỗi!")
      console.error("Xảy ra lỗi khi cập nhật", error);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="form-checkbox h-4 w-4 text-indigo-600"
      />
      <span className="ml-2">Hoàn thành</span>
    </div>
  );
};

export default CheckboxStatus;
