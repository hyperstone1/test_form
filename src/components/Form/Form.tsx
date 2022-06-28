import React, { useState, useEffect } from 'react';
import s from './Form.module.scss';
import Input from '../Input/Input';
import { regTextarea } from 'src/utils/constants';

export default function Form() {
  const [date, setDate] = useState('2017-02-05');
  const [name, setName] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя и Фамилия не могут быть пустыми');
  const [emailError, setEmailError] = useState('E-mail не может быть пустым');
  const [formValid, setFormValid] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [phone, setPhone] = useState('');
  const [textarea, setTextarea] = useState('');
  const [textareaDirty, setTextareaDirty] = useState(false);
  const [textareaError, setTextareaError] = useState('Сообщение не может быть пустым');
  const [responseOk, setResponseOk] = useState('');
  const [responseErr, setResponseErr] = useState('');
  const [isResponseOk, setIsResponseOk] = useState(false);
  const [isResponseErr, setIsResponseErr] = useState(false);

  useEffect(() => {
    if (nameError || emailError || isFormSubmit || textareaError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, textareaError, isFormSubmit]);

  const textareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
    if (!regTextarea.test(String(e.target.value).toLowerCase())) {
      setTextareaError('Некорректное сообщение. Минимальная длина 10 символов, максимальная - 300');
      if (!e.target.value) {
        setTextareaError('Сообщение не может быть пустым.');
      }
    } else {
      setTextareaError('');
    }
  };

  const onBlurInput = (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'textarea':
        setTextareaDirty(true);
        break;
    }
  };

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name === '' || email === '' || textarea === '') {
      alert('Заполните обязательные поля');
      setEmailError('E-mail не может быть пустым.');
      setNameError('Имя и фамилия не могут быть пустыми.');
      setTextareaError('Сообщение не может быть пустым.');
    } else {
      setIsFormSubmit(true);
      event.currentTarget.classList.add('active');
      fetch(`https://628b819f7886bbbb37b9b01b.mockapi.io/items`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          date: date,
          message: textarea,
        }),
      })
        .then((response) => {
          console.log('response', response);
          if (response.ok) {
            setName('');
            setEmail('');
            setPhone('');
            setDate('');
            setTextarea('');
            setIsResponseOk(true);
            delay();
            setResponseOk(response.statusText);
            return response.json();
          }
          if (!response.ok) {
            setIsResponseErr(true);
            setResponseErr(response.statusText);
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((json) => {
          console.log(json);
        });
      setIsFormSubmit(false);
    }
  }
  const delay = () => {
    setTimeout(function () {
      setIsResponseOk(false);
      setIsResponseErr(false);
    }, 3000);
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.login}>
          <p className={s.autorization}>Форма обратной связи</p>
          <form noValidate onSubmit={submitHandler} action="">
            <div className={s.formContainer}>
              <Input
                onBlurInput={onBlurInput}
                date={date}
                name={name}
                email={email}
                setName={setName}
                setNameError={setNameError}
                setEmail={setEmail}
                setDate={setDate}
                phone={phone}
                setEmailError={setEmailError}
                emailError={emailError}
                setPhone={setPhone}
                nameDirty={nameDirty}
                nameError={nameError}
                emailDirty={emailDirty}
                setEmailDirty={setEmailDirty}
              />

              <div className={s.textarea}>
                <div className={s.containerInput}>
                  {textareaDirty && textareaError && (
                    <div className={s.error} style={{ color: 'red', paddingTop: '5px' }}>
                      {textareaError}
                    </div>
                  )}
                  <textarea
                    value={textarea}
                    onChange={(e) => textareaHandler(e)}
                    name="textarea"
                    onBlur={(e) => onBlurInput(e)}
                    placeholder="Введите ваше сообщение"
                  />
                  <label htmlFor="">Сообщение</label>
                </div>
              </div>
            </div>
            <button disabled={!formValid} type="submit" className={s.butLogin}>
              Отправить
            </button>
          </form>
          {isResponseOk && (
            <div
              className={s.resOk}
              style={{
                color: 'green',
                fontSize: '20px',
                marginTop: '25px',
                textDecoration: 'underline',
              }}>
              {responseOk}
            </div>
          )}
          {isResponseErr && (
            <div
              className={s.resErr}
              style={{
                color: 'red',
                fontSize: '22px',
                fontWeight: '700',
                marginTop: '25px',
                textDecoration: 'underline',
              }}>
              {responseErr}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
