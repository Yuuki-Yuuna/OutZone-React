import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'antd-style'
import { App as AntdApp, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import router from './router'
import theme from './theme.json'
import darkTheme from './dark-theme.json'

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <ThemeProvider theme={theme} themeMode={'light'}>
        <AntdApp>
          <GlobalStyle />
          <Suspense>
            <RouterProvider router={router} />
          </Suspense>
        </AntdApp>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    color: ${(p) => p.theme.colorText};
    background-color: ${(p) => p.theme.colorBgLayout};
    font-family: ${(p) => p.theme.fontFamily};
    font-size: ${(p) => p.theme.fontSize + 'px'};
  }

  .anticon {
    font-size: ${(p) => p.theme.fontSizeIcon + 'px'};
  }
`