import React from 'react';
import { useToast } from '../../context/ToastContext';

export default function Toast() {
  const { toast } = useToast();

  return (
    <div id="toast" className={`toast ${toast.visible ? 'show' : ''}`} role="status">
      <div id="toastMsg" dangerouslySetInnerHTML={{ __html: toast.message }} />
    </div>
  );
}
