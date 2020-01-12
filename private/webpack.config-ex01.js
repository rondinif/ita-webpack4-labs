module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  };