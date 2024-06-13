import { useState } from 'react';

function useInput(type: string): any {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const validations_types: any = {
    addressNumber: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El campo no puede estar vacío'
      },
      {
        condition: (valor: string) => /^-?[\d.,]+$/.test(valor),
        messageError: '*El campo solo acepta numeros'
      }
    ],
    postalCode: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El campo no puede estar vacío'
      },
      {
        condition: (valor: string) => /^-?[\d.,]+$/.test(valor),
        messageError: '*El campo solo acepta numeros'
      }
    ],
    deliveryCode: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El campo no puede estar vacío'
      },
      {
        condition: (valor: string) => !/[0-9]/.test(valor),
        messageError: '*El campo solo puede contener letras'
      }
    ],
    name: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El campo no puede estar vacío'
      },
      {
        condition: (valor: string) => !/[0-9]/.test(valor),
        messageError: '*El campo solo puede contener letras'
      }
    ],
    city: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El campo no puede estar vacío'
      },
      {
        condition: (valor: string) => !/[0-9]/.test(valor),
        messageError: '*El campo solo puede contener letras'
      }
    ],
    package_weight: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El campo no puede estar vacío'
      },
      {
        condition: (valor: string) => /^-?[\d.,]+$/.test(valor),
        messageError: '*El campo solo acepta numeros'
      }
    ],
    address: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El campo no puede estar vacío'
      },
      {
        condition: (valor: string) => /^[a-zA-Z0-9\s]+$/.test(valor),
        messageError: '*El campo solo acepta numeros y letras'
      }
    ],
    lastname: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El apellido no puede estar vacío'
      },
      {
        condition: (valor: string) => !/[0-9]/.test(valor),
        messageError: '*El apellido solo puede contener letras'
      }
    ],
    mail: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*El mail no puede estar vacío'
      },
      {
        condition: (valor: string) =>
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(valor),
        messageError: '*El mail debe ser un mail válido'
      }
    ],

    password: [
      {
        condition: (valor: string) => valor.trim() !== '',
        messageError: '*La contraseña no puede estar vacía'
      },
      {
        condition: (valor: string) => valor.length >= 8,
        messageError: '*La contraseña debe contener al menos 8 caracteres'
      },
      {
        condition: (valor: string) => /[0-9]/.test(valor),
        messageError: '*La contraseña debe contener al menos un nº'
      },
      {
        condition: (valor: string) => /[A-Z]/.test(valor),
        messageError: '*La contraseña debe contener al menos una mayúscula'
      },
      {
        condition: (valor: string) => /[a-z]/.test(valor),
        messageError: '*La contraseña debe contener al menos una minúscula'
      }
    ]
  };
  const blur = (): void => {
    let msj = '';
    const validation = validations_types[type];
    if (!validation) return;
    for (const key in validation) {
      const { messageError, condition } = validation[key];
      if (!condition(value)) {
        msj = messageError;
        break;
      }
    }
    setMessage(msj);
  };
  const focus = () => {
    setMessage('');
  };
  return { message, blur, focus, onChange, value, setValue };
}
export default useInput;
