import { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const validate = (values) => {
  const errors = {};

  // Перевірка імені
  if (!values.name.trim()) {
    errors.name = "Ім'я є обов'язковим для заповнення";
  } else if (values.name.trim().length < 2) {
    errors.name = "Ім'я повинно містити принаймні 2 символи";
  }

  // Перевірка балів (від 0 до 100)
  if (values.score === "") {
    errors.score = "Будь ласка, введіть бал";
  } else if (isNaN(values.score) || Number(values.score) < 0 || Number(values.score) > 100) {
    errors.score = "Бал повинен бути числом від 0 до 100";
  }

  return errors;
};

function AddStudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({ name: '', score: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ name: false, score: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const currentErrors = validate(formData);
    setErrors(currentErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      onAddStudent({
        id: Date.now(),
        name: formData.name.trim(),
        score: formData.score !== '' ? Number(formData.score) : null
      });
      setFormData({ name: '', score: '' });
      setErrors({});
      setTouched({ name: false, score: false });
    } else {
      setErrors(validationErrors);
    }
  };

  const hasErrors = Object.keys(validate(formData)).length > 0;
  const isFormEmpty = !formData.name.trim() || formData.score === '';
  const isButtonDisabled = hasErrors || isFormEmpty;

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Input
          label="Прізвище та ім'я:"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Введіть ПІБ"
        />
        {errors.name && <p style={{ color: 'red', margin: '4px 0 0', fontSize: '14px' }}>{errors.name}</p>}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Input
          label="Бал студента:"
          name="score"
          type="number"
          value={formData.score}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0-100"
        />
        {errors.score && <p style={{ color: 'red', margin: '4px 0 0', fontSize: '14px' }}>{errors.score}</p>}
      </div>

      <Button type="submit" disabled={isButtonDisabled}>
        Додати студента
      </Button>
    </form>
  );
}

export default AddStudentForm;
