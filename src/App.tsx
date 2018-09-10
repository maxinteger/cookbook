import { CssBaseline } from '@material-ui/core'
import * as React from 'react'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import {Routes} from './Routes'
import {initHistory} from './app/history'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset()
})

export class App extends React.PureComponent<{}> {
  public render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div>
          <CssBaseline />
          <Routes history={initHistory()} />
        </div>
      </JssProvider>
    )
  }
}
