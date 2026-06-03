"use client";

import React, { useState } from "react";
import Input from "../forms/Input";
import FileUploader from "../forms/FileUploader";
import Button from "../forms/Button";
import Modal from "../common/Modal";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { FaSpinner } from "react-icons/fa";

const CoupleRegisterForm = () => {
  const router = useRouter();
  type CoupleFormData = {
    partner1Forename: string;
    partner1Surname: string;
    partner2Forename: string;
    partner2Surname: string;
    partner1nationalID: string;
    partner2nationalID: string;
    phoneNumber: string;
    email: string;
    images: File[];
  };
  const defaultState: CoupleFormData = {
    partner1Forename: "",
    partner1Surname: "",
    partner2Forename: "",
    partner2Surname: "",
    partner1nationalID: "",
    partner2nationalID: "",
    phoneNumber: "",
    email: "",
    images: [],
  };
  const [formData, setFormData] = useState<CoupleFormData>(defaultState);
  // const [formData, setFormData] = useState<CoupleFormData>({
  //   partner1Forename: "",
  //   partner1Surname: "",
  //   partner2Forename: "",
  //   partner2Surname: "",
  //   partner1ID: "",
  //   partner2ID: "",
  //   phoneNumber: "",
  //   email: "",
  //   images: [],
  // });

  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, images: files }));
  };
  const [loading, setLoading] = useState(false);
  const handleNext = async () => {
  if (step === 1) {
    setLoading(true);
    // Send phone number to backend to trigger OTP
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/send-code/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: formData.phoneNumber }),
      });

      if (res.ok) {
        setShowModal(true);
        setLoading(false);
      } else {
        alert("خطا در ارسال کد");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("خطای شبکه");
    }
  } else {
    setStep(step + 1);
  }
};


  const handleBack = () => setStep((prev) => prev - 1);

  const { login, accessToken } = useAuthContext();

  const handleSubmit = async (tokenOverride?: string) => {
    const token = tokenOverride || accessToken;
    const form = new FormData();
    form.append("partner1_forename", formData.partner1Forename);
    form.append("partner1_surname", formData.partner1Surname);
    form.append("partner1_national_id", formData.partner1nationalID);
    form.append("partner2_forename", formData.partner2Forename);
    form.append("partner2_surname", formData.partner2Surname);
    form.append("partner2_national_id", formData.partner2nationalID);
    form.append("email", formData.email);

    if (formData.images.length === 0) {
      alert("لطفاً تصویر عقدنامه را آپلود کنید.");
      return;
    }

    form.append("document", formData.images[0]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/couples/register/`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      if (!res.ok) {
        const data = await res.json();
        console.error("🔴 Error during submit:", data);
        alert("خطا در ثبت اطلاعات");
        return;
      }

      const data = await res.json();
      const { slug } = data;

      if (!slug) {
        console.error("❌ Missing slug in response:", data);
        alert("ثبت نام موفق نبود. لطفاً دوباره تلاش کنید.");
        return;
      }

      alert("ثبت زوج با موفقیت انجام شد");
      setFormData(defaultState);
      router.push(`/couples/${slug}`);
    } catch (err) {
      console.error("❌ Network error:", err);
      alert("خطای شبکه");
    }
  };


  const handleCodeSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: formData.phoneNumber,
          code: codeInput,
        }),
      });

      if (!res.ok) {
        setCodeError("کد اشتباه است");
        setLoading(false);
        return;
      }

      const { access, refresh } = await res.json();

      // Wait for login to complete before submitting
      await login(access, refresh);

      // Now submit the form with the new token
      await handleSubmit(access);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("خطا در تأیید");
    }
  };



  // const handleCodeSubmit = async () => {
  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/verify/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         phone_number: formData.phoneNumber,
  //         code: codeInput,
  //       }),
  //     });
    
  //     if (!res.ok) {
  //       setCodeError("کد اشتباه است");
  //       return;
  //     }
  
  //     const data = await res.json();
  //     setFormData(defaultState);
  //     router.push(`/couples/${data.id}`);
  //     // login(data.access);
  //     // setShowModal(false);
  //     // setStep(1); // Proceed to final form step
  //   } catch (err) {
  //     console.error(err);
  //     setCodeError("خطا در تأیید");
  //   }
  // };

  return (
    <div className="flex items-stretch h-full min-h-[90vh]">
      {/* Left: Form */}
      <div
        className={`
          w-full
          min-h-[90vh]
          h-full
          md:w-2/3 
          flex 
          flex-col
          items-start
          px-16 pb-10
          bg-cover bg-center 
          ${step === 0 ? "bg-[url('/registerstep1.jpg')]" : ""}
          ${step === 1 ? "bg-[url('/registerstep2.jpg')]" : ""}
          md:bg-none
        `}
      >
        <form className="w-full flex-grow p-6 md:bg-transparent bg-white/30 backdrop-blur-sm rounded-lg relative pb-24 md:mt-0 mt-10 space-y-4">
          <div className="h-20">
            <h2 className="text-2xl font-semibold float-start">لطفا فرم را پر کنید</h2>
            <h3 className="text-md font-semibold float-end">مرحله {step + 1} از 2</h3>
          </div>

          {step === 0 && (
            <>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/5 md:me-4">
                  <Input
                    label="نام"
                    name="partner1Forename"
                    value={formData.partner1Forename}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:w-2/5 md:me-4">
                  <Input
                    label="نام خانوادگی"
                    name="partner1Surname"
                    value={formData.partner1Surname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:w-2/5">
                  <Input
                    label="کد ملی"
                    name="partner1nationalID"
                    value={formData.partner1nationalID}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/5 md:me-4">
                  <Input
                    label="نام همسر"
                    name="partner2Forename"
                    value={formData.partner2Forename}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:w-2/5 md:me-4">
                  <Input
                    label="نام خانوادگی همسر"
                    name="partner2Surname"
                    value={formData.partner2Surname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:w-2/5">
                  <Input
                    label="کد ملی همسر"
                    name="partner2nationalID"
                    value={formData.partner2nationalID}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <div className="md:flex">
              <div className="md:w-1/2 md:me-4">
                <Input
                  label="شماره تلفن"
                  name="phoneNumber"
                  pattern="^09\d{9}$"
                  title="شماره تلفن باید با 09 شروع شده و 11 رقم باشد"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="ایمیل (اختیاری)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:w-1/2">
                <label className="block text-sm font-medium mb-1">تصویر عقدنامه</label>
                <FileUploader onChange={handleImagesChange} multiple />
              </div>
            </div>
          )}
          <div className="absolute bottom-6 left-0 w-full flex justify-between px-6">
            {step > 0 && (
              <div className="w-28">
                <Button type="button" onClick={handleBack}>
                  قبلی
                </Button>
              </div>
            )}
            {step === 0 && (
              <div className="w-full">
                <p>اگر ثبت نام کرده اید <a href="">اینجا</a> کلیک کنید.</p>
                {/* <p>اگر ثبت نام کرده اید <a href="">اینجا</a> کلیک کنید.</p> */}
              </div>
            )}
            <div className="w-28">
            {loading ? 
              <div className="animate-spin text-2xl text-gray-700">
                <FaSpinner />
              </div>
            :
              <Button type="button" onClick={handleNext}>
                {step === 2 ? "دریافت کد" : "بعدی"}
              </Button>
            }
            </div>
          </div>
        </form>
      </div>

      {/* Right: Image */}
      <div
        className="hidden md:block w-1/3 bg-cover bg-center"
        style={{
          backgroundImage: `url(/registerstep${step + 1}.jpg)`,
        }}
      ></div>

      {/* Code Entry Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Enter Verification Code">
          <div className="space-y-4">
            <Input
              label="Verification Code"
              name="code"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
            {codeError && <p className="text-red-500 text-sm">{codeError}</p>}
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleCodeSubmit}>
                ثبت نام
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CoupleRegisterForm;
