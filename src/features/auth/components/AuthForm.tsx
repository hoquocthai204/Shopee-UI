import { Button, Form, Input } from 'antd';
import { AuthInformation } from 'models';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useTranslation } from 'react-i18next';

export interface AuthFormProps {
  initialValue: AuthInformation;
  onSubmit: (formValues: AuthInformation) => void;
  onFail?: (errorInfo: ValidateErrorEntity<AuthInformation>) => void;
  submitType?: string;
}

export const AuthForm = ({ initialValue, onSubmit, onFail, submitType }: AuthFormProps) => {
  const { t } = useTranslation();
  return (
    <Form
      name="auth"
      initialValues={initialValue}
      layout="vertical"
      onFinish={onSubmit}
      onFinishFailed={onFail}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        className="auth__input-container"
      >
        <Input className="auth__input" placeholder={t('auth.placeholder1')} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        className="auth__input-container"
      >
        <Input.Password className="auth__input" placeholder={t('auth.placeholder2')} />
      </Form.Item>

      <Form.Item>
        <Button className="auth__submit" type="primary" block danger htmlType="submit">
          {submitType || 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};
