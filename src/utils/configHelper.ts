const configHelper: {
  graphQlUri: string
} = {
  graphQlUri: process.env.SERVER_URL
    ? process.env.SERVER_URL
    : 'http://localhost:4003',
}

export default { configHelper }
