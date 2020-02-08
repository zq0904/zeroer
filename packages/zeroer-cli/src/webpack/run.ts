
import Webpack from 'webpack'

const run = (config: Webpack.Configuration) => {
  Webpack(config).run((err, stats) => {
    if (err) {
      console.error(err.stack ?? err)
      // @ts-ignore
      if (err.details) console.error(err.details)
      return
    }

    console.log(stats.toString({
      chunks: false,
      colors: true
    }))
  })
}

export default run
