import React, { useState } from 'react'
import './Register.scss'
import { Form, Input, Button, Spin } from 'antd'
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'

const Register: React.FC = () => {
  const [isTransform, setIstransfrom] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)//加载栏

  const toNext = () => {
    setLoading(true)
    form.validateFields(['username', 'email', 'capcha']).then(values => {
      setLoading(false)
      setIstransfrom(true)
    }).catch(err => {
      setLoading(false)
    })
  }

  const toBack = () => {
    setIstransfrom(false)
  }

  const register = (values: any) => {
    console.log(values)
  }

  return (
    <div className='register'>
      <div className='register-box'>
        <div className='glass'></div>
        <div className='register-form'>
          <h1 className='title'>Register</h1>
          {/* <div className='flex-grow'></div> */}
          <Form form={form} name="注册" onFinish={register} autoComplete="off" labelCol={{ span: 8 }} validateTrigger='onBlur'>
            <div className={isTransform ? 'register-card transform' : 'register-card'}>
              { loading ? <Spin className='loading'  indicator={<LoadingOutlined />} size='large'></Spin> : null }
              <div className='left'>
                <Form.Item
                  label='账&nbsp;&nbsp;号'
                  name='username'
                  className='form-item'
                  requiredMark={'optional'}
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      min: 4,
                      max: 16,
                      message: '账号应在4-16位间',
                    },
                  ]}
                >
                  <Input className='input' maxLength={16} />
                </Form.Item>
                <Form.Item
                  label='邮&nbsp;&nbsp;箱'
                  name='email'
                  className='form-item'
                  requiredMark={'optional'}
                  rules={[
                    {
                      required: true,
                      pattern: /^[a-zA-Z0-9][a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})*$/i,
                      message: '非法的邮箱格式'
                    }
                  ]}
                >
                  <Input className='input' maxLength={20} />
                </Form.Item>
                <Form.Item
                  label='验证码'
                  name='capcha'
                  className='form-item'
                  requiredMark={'optional'}
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码'
                    }
                  ]}
                >
                  <div className='capcha-box'>
                    <Input className='input capcha' maxLength={20} />
                    <span className='capcha-send'>重新发送<i>60</i></span>
                  </div>
                </Form.Item>
                <Button className='next' type="primary" shape="round" onClick={toNext}>下一步</Button>
              </div>
              <div className='right'>
                <Form.Item
                  label="密码"
                  name="password"
                  className='form-item'
                  requiredMark={'optional'}
                  rules={[
                    {
                      required: true,
                      type: 'string',
                      min: 6,
                      max: 20,
                      message: '密码应在6-20位间',
                    },
                  ]}
                >
                  <Input.Password className='input' maxLength={20} />
                </Form.Item>
                <Form.Item
                  label="确认密码"
                  name="confirmPassword"
                  className='form-item'
                  requiredMark={'optional'}
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: '请输入确认密码'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('两次密码不一致'))
                      },
                    })
                  ]}
                >
                  <Input.Password className='input' maxLength={20} />
                </Form.Item>
                <Button className='back' icon={<ArrowLeftOutlined />} onClick={toBack}></Button>
                <Button className='next' type="primary" shape="round" htmlType='submit'>注册</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register