import yaml from 'js-yaml';

const numberType = new yaml.Type('!', {
	kind: 'scalar',
	resolve: (data) => {
		return !isNaN(data) && !/^0x[0-9a-fA-F]{1,64}$/.test(data);
	},
	construct: (data) => Number(data),
	instanceOf: Number,
	represent: (data) => Number(data)
});

export const FailsafeSchemaWithNumbers = yaml.FAILSAFE_SCHEMA.extend({
	implicit: [numberType]
});
