'use client'

import axios from 'axios'
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { PiHandWavingBold } from 'react-icons/pi'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from '../../hooks/useRegisterModal'
import Modals from './Modals'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import Link from 'next/link'

import { signIn } from 'next-auth/react'
import LoginModal from './LoginModal'
  
const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to MTSA marketplace"
        subtitle="Please register to continue"
        icon={PiHandWavingBold}
        center
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        type="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Facebook"
        icon={AiFillFacebook}
        onClick={() => signIn('facebook')}
      />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="text-[#00274C]">Already have an account?</div>
        <div
          onClick={toggle}
          className="text-[#00274C] font-bold cursor-pointer hover:opacity-50"
        >
          Login
        </div>
      </div>
      <div className="flex justify-center text-sm">
        <Link href="/about/privacy-policy">View our Privacy Policy</Link>
      </div>
    </div>
  )

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // turn on the loading indicator
    setIsLoading(true);
    axios
      .post("/api/register", data)
      // close the modal after successfully registering
      .then(() => {
        registerModal.onClose();
        toast.success("Successfully registered!");
      })
      // print error message if there is any error
      .catch((error) => {
        toast.error("Something went wrong")
      })
      // turn off the loading indicator
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Modals
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        body={bodyContent}
        footer={footerContent}
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
         />
    </div>
  );
}

export default RegisterModal
