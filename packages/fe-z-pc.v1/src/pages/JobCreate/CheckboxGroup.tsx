import React, { useState } from 'react'

interface CheckboxGroupProps {
  name: string;
  options: Array<{ label: string, value: string, checked: boolean }>;
  onChange: (checkedValues: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, options, onChange }) => {
  const [checkboxGroup, setCheckboxGroup] = useState(options)
  const handleChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const cloneCheckboxGroup: typeof checkboxGroup = JSON.parse(JSON.stringify(checkboxGroup))
    // @ts-ignore
    cloneCheckboxGroup.find(({ value: val }) => val === value).checked = e.target.checked
    setCheckboxGroup(cloneCheckboxGroup)
    const nowRes = cloneCheckboxGroup.filter(({ checked }) => checked).map(({ value }) => value)
    onChange(nowRes)
  }
  return (
    <>
      {
        checkboxGroup.map(({ label, value, checked }) => (
          <span key={value}>
            <input type="checkbox" name={name}
              value={value}
              checked={checked}
              onChange={e => handleChange(value, e)}
            /> 
            { label }
          </span>
        ))
      }
    </>
  )
}

export default CheckboxGroup
