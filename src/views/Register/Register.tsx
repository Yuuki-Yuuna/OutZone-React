import React, { useEffect, useState } from 'react'
import './Register.scss'
import { Form, Input, Button, Spin, message } from 'antd'
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { getRegisterCode, userRegister } from '@/api/user'
import { RegisterUser } from '@/type/User'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [isTransform, setIstransfrom] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)//加载栏
  const [countDown, setCountDown] = useState(0)

  const toNext = () => {
    setLoading(true)
    form.validateFields(['username', 'mailAddress', 'verificationCode']).then(values => {
      setLoading(false)
      setIstransfrom(true)
    }).catch(err => {
      setLoading(false)
    })
  }
  const toBack = () => {
    setIstransfrom(false)
  }
  const sendCapcha = () => {
    form.validateFields(['username', 'mailAddress']).then((values: { username: string, mailAddress: string }) => {
      const { username, mailAddress } = values
      setCountDown(60)//用useEffect监测
      getRegisterCode({ username, mailAddress }).then(res => {
        const result = res.data
        if(result.code != 200) {
          message.error(result.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      // console.log(err)
    })
  }
  const register = (values: RegisterUser) => {
    // console.log(values)
    setLoading(true)
    userRegister(values).then(res => {
      const result = res.data
      // console.log(result)
      if (result.code == 200) {
        message.success('注册成功~')
        navigate('/login', { replace: true })
      } else {
        message.error(result.msg)
      }
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  }, [countDown])

  return (
    <div className='register'>
      <div className='register-box'>
        <div className='glass'></div>
        <div className='register-form'>
          <Spin spinning={loading} indicator={<LoadingOutlined />} size='large'>
            <h1 className='title'>Register</h1>
            {/* <div className='flex-grow'></div> */}
            <Form form={form} name="注册" onFinish={register} autoComplete="off">
              <div className={isTransform ? 'register-card transform' : 'register-card'}>
                <div className='left'>
                  <Form.Item
                    label='账&nbsp;&nbsp;号'
                    name='username'
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
                    name='mailAddress'
                    requiredMark={'optional'}
                    rules={[
                      {
                        required: true,
                        pattern: /^[a-zA-Z0-9][a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})*$/i,
                        message: '非法的邮箱格式'
                      }
                    ]}
                  >
                    <Input className='input' maxLength={20} autoComplete='off' />
                  </Form.Item>
                  <Form.Item
                    label='验证码'
                    name='verificationCode'
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
                      {countDown ? <span className='capcha-send'>重新发送<i>{countDown}</i></span>
                        : <span className='capcha-send' style={{ color: '#096dd9' }} onClick={sendCapcha}>发送验证码</span>}
                    </div>
                  </Form.Item>
                  <Button className='next' type="primary" shape="round" onClick={toNext}>下一步</Button>
                </div>
                <div className='right'>
                  <Form.Item
                    label="密码"
                    name="password"
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
          </Spin>
        </div>
      </div>
    </div>
  )
}

export default Register