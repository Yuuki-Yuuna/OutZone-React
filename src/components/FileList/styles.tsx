import { createStyles } from 'antd-style'

export const useStyles = createStyles(({ token, css }) => {
  return {
    listItem: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: ${token.colorBorder} 1px solid;
      padding: 1em;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: ${token.colorFillSecondary};
      }
    `,
    listItemSelected: css`
      background: ${token.colorPrimaryActive} !important;
      color: ${token.colorWhite};
    `,
    listItemFlexOne: css`
      flex-shrink: 0;
      flex-grow: 1;
      justify-self: start;
      display: flex;
    `,
    listItemFlexTwo: css`
      justify-self: end;
    `,
    listItemFlexThree: css`
      justify-self: center;
    `,

    fileTimeAndSize: css`
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 18em;
    `,
    fileNameAndIcon: css`
      display: flex;
      gap: 0.5em;
    `,
    fileOptionsPannel: css`
      display: flex;
      gap: 0.25em;
      color: ${token.colorPrimary};
    `,
    fileOptionsIcon: css`
      transform: scale(0.8);
      transition: all 0.15s;
      &:hover {
        opacity: 0.8;
        transform: scale(0.9);
      }
    `,
    fileName: css`
      &:hover {
        color: ${token.colorPrimary};
      }
    `
  }
})
