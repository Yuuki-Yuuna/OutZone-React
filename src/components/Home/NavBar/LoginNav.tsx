import React, { useEffect, useState } from 'react'
import { createStyles } from 'antd-style'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin, Modal, Tabs, TabsProps, Form, Input, App } from 'antd'
import { userLogin } from '~/api'
import { LoginInfo, ResponseError } from '~/types'

const LoginNav: React.FC = () => {
  const { styles } = useStyles()
  const { message } = App.useApp()

  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countDown, setCountDown] = useState(0)

  const login = async (userInfo: LoginInfo) => {
    setLoading(true)
    try {
      const res = await userLogin(userInfo)
      // console.log(res.data)
      const { token } = res.data
      localStorage.setItem('token', token)
      message.success('登录成功~')
    } catch (err) {
      message.error((err as ResponseError).message)
    }
    setLoading(false)
  }

  const register = () => {}

  const sendCapcha = () => {
    registerForm
      .validateFields(['email'])
      .then((values: { email: string }) => {
        console.log(111)
        const { email } = values
        setCountDown(60)
      })
      .catch(() => {})
  }
  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  }, [countDown])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    if (!loading) {
      loginForm.resetFields()
      registerForm.resetFields()
      setIsModalOpen(false)
    }
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'login',
      label: '用户登录',
      children: (
        <div className={styles.tab}>
          <h2 className={styles.title}>Login</h2>
          <Form
            form={loginForm}
            name='登录'
            onFinish={login}
            validateTrigger='onBlur'
            autoComplete='off'
          >
            <UserName />
            <Password />
            <Submit text='登录' />
          </Form>
        </div>
      )
    },
    {
      key: 'register',
      label: '用户注册',
      children: (
        <div className={styles.tab}>
          <h2 className={styles.title}>Register</h2>
          <Form
            form={registerForm}
            name='注册'
            onFinish={register}
            validateTrigger='onSubmit'
            autoComplete='off'
          >
            <UserName />
            <Password />
            <Form.Item
              label='邮箱'
              name='email'
              required={false}
              rules={[
                {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9][a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})*$/i,
                  message: '非法的邮箱格式'
                }
              ]}
            >
              <Input maxLength={20} placeholder='请输入邮箱' />
            </Form.Item>
            <Form.Item
              label='验证码'
              name='verificationCode'
              required={false}
              rules={[
                {
                  required: true,
                  message: '请输入验证码'
                }
              ]}
            >
              <div>
                <Input style={{ width: 100 }} maxLength={10} placeholder='输入验证码 ' />
                {countDown ? (
                  <Button className={styles.capcha} disabled type='link'>
                    重新发送{countDown}
                  </Button>
                ) : (
                  <Button className={styles.capcha} type='link' onClick={sendCapcha}>
                    发送验证码
                  </Button>
                )}
              </div>
            </Form.Item>
            <Submit text='注册' />
          </Form>
        </div>
      )
    }
  ]

  return (
    <>
      <span className={styles.button} onClick={showModal}>
        登录/注册
      </span>
      <Modal
        forceRender={true}
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
        maskClosable={false}
      >
        <Spin spinning={loading} indicator={<LoadingOutlined />} size='large'>
          <Tabs items={tabItems} defaultActiveKey='login' />
        </Spin>
      </Modal>
    </>
  )
}

const UserName: React.FC = () => {
  return (
    <Form.Item
      label='账号'
      name='username'
      required={false}
      rules={[
        {
          required: true,
          type: 'string',
          min: 4,
          max: 16,
          message: '账号应在4-16位间'
        }
      ]}
    >
      <Input maxLength={16} placeholder='请输入账号' />
    </Form.Item>
  )
}

const Password: React.FC = () => {
  return (
    <Form.Item
      label='密码'
      name='password'
      required={false}
      rules={[
        {
          required: true,
          type: 'string',
          min: 6,
          max: 20,
          message: '密码应在6-20位间'
        }
      ]}
    >
      <Input.Password maxLength={20} placeholder='请输入密码' />
    </Form.Item>
  )
}

const Submit: React.FC<{ text: string }> = (props) => {
  return (
    <Form.Item style={{ width: 'fit-content', margin: 'auto' }}>
      <Button type='primary' htmlType='submit' shape='round'>
        {props.text}
      </Button>
    </Form.Item>
  )
}

export default LoginNav

const useStyles = createStyles(({ token, css }) => {
  return {
    tab: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      margin: auto;
    `,
    title: css`
      font-style: italic;
      color: ${token.colorTextHeading};
      margin-bottom: 6px;
    `,
    button: css`
      cursor: pointer;
      color: ${token.colorTextDescription};
      font-size: ${token.fontSizeSM}px;

      &:hover {
        color: ${token.colorPrimaryHover};
      }
    `,
    capcha: css`
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
    `
  }
})
