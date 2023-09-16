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
        // label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        className="auth__input-container"
      >
        <Input className="auth__input" placeholder="Email/Số điện thoại/Tên đăng nhập" />
      </Form.Item>

      <Form.Item
        // label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        className="auth__input-container"
      >
        <Input.Password className="auth__input" placeholder="Mật khẩu" />
        {/* <svg fill="none" viewBox="0 0 20 10" className="_340FWs">
          <path
            stroke="none"
            fill="#000"
            fillOpacity=".54"
            d="M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z"
          ></path>
        </svg> */}
      </Form.Item>

      <Form.Item>
        <Button className="auth__submit" type="primary" block danger htmlType="submit">
          {submitType || 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};
