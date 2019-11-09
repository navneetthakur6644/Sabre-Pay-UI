// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  endpoint: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect',
  subscriptionKey: 'b36a4edbc372433ea78d2786acb63dbe'
  //subscriptionKey: string = 'f19864adc9dc421b999b28f03212170b';
};
