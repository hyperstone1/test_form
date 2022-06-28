import React from 'react';
import s from '../Form/Form.module.scss';
import { uppercase } from '../../utils/uppercase';
import { regName, regEmail } from '../../utils/constants';

export default function Input({
  name,
  email,
  phone,
  date,
  setName,
  setNameError,
  setEmail,
  setEmailError,
  setPhone,
  nameDirty,
  nameError,
  onBlurInput,
  emailDirty,
  emailError,
  setDate,
}: any) {
  const inputValues = [
    {
      id: 1,
      label: 'Имя и Фамилия',
      value: name,
      name: 'name',
      error: nameError,
      dirty: nameDirty,
      type: 'text',
      placeholder: 'Введите имя и фамилию',
    },
    {
      id: 2,
      label: 'Email',
      value: email,
      name: 'email',
      error: emailError,
      dirty: emailDirty,
      type: 'text',
      placeholder: 'Введите email',
    },
    {
      id: 3,
      label: 'Номер телефона',
      value: phone,
      name: 'phone',
      type: 'tel',
      placeholder: '+7 (___)___-__-__',
    },
    {
      id: 4,
      label: 'Дата рождения',
      value: date,
      name: 'date',
      type: 'date',
      placeholder: 'Выберите дату',
    },
  ];

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        let inputValue: string = uppercase(e.target.value);
        setName(inputValue);
        if (!regName.test(String(inputValue).toLowerCase())) {
          setNameError('Некорректные имя и фамилия.');
          if (!e.target.value) {
            setNameError('Имя и фамилия не могут быть пустыми.');
          }
        } else {
          setNameError('');
        }
        break;
      case 'email':
        setEmail(e.target.value);
        if (!regEmail.test(String(e.target.value).toLowerCase())) {
          setEmailError('Некорректный e-mail');
          if (!e.target.value) {
            setEmailError('E-mail не может быть пустым.');
          }
        } else {
          setEmailError('');
        }
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'date':
        setDate(e.target.value);
        break;
    }
  };

  const onKeyDownPhone = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case 'phone':
        if (
          !(e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Backspace' || e.key == 'Tab')
        ) {
          e.preventDefault();
        }
        let mask: string = '+7 (111) 111-11-11';

        if (/[0-9\+\ \-\(\)]/.test(e.key)) {
          let currentString: string = e.currentTarget.value;
          let currentLength: number = currentString.length;
          if (/[0-9]/.test(e.key)) {
            if (mask[currentLength] == '1') {
              e.currentTarget.value = currentString + e.key;
            } else {
              for (var i = currentLength; i < mask.length; i++) {
                if (mask[i] == '1') {
                  e.currentTarget.value = currentString + e.key;
                  break;
                }
                currentString += mask[i];
              }
            }
          }
          setPhone(e.currentTarget.value);
        }
        break;
    }
  };

  return (
    <>
      {inputValues.map((item) => (
        <div key={item.id} className={s.containerInput}>
          {item.dirty && item.error && (
            <div className={s.error} style={{ color: 'red', paddingTop: '5px' }}>
              {item.error}
            </div>
          )}
          <input
            value={item.value}
            onChange={(e) => onChangeInput(e)}
            onKeyDown={(e) => onKeyDownPhone(e)}
            onBlur={(e) => onBlurInput(e)}
            name={item.name}
            type={item.type}
            placeholder={item.placeholder}
          />
          <label htmlFor="">{item.label}</label>
        </div>
      ))}
    </>
  );
}
