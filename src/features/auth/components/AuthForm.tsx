import { Button, Form, Input } from 'antd';
import { AuthInformation } from 'models';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

export interface AuthFormProps {
  initialValue: AuthInformation;
  onSubmit: (formValues: AuthInformation) => void;
  onFail?: (errorInfo: ValidateErrorEntity<AuthInformation>) => void;
  submitType?: string;
}

export const AuthForm = ({ initialValue, onSubmit, onFail, submitType }: AuthFormProps) => {
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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input className="auth__input" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password className="auth__input" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block danger htmlType="submit">
          {submitType || 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};
