import type { Meta, StoryObj } from '@storybook/react';
import { getFieldPresetsButtons } from '@/app/_services/buttonsData';
import { Field } from '@/app/_types/yamlData';
import { Button } from '@/app/types';

/**
 * These stories render the REAL output of `getFieldPresetsButtons`
 * (`app/_services/buttonsData.ts`). Nothing here is hardcoded: each panel calls
 * the real function on a representative `Field` and displays, for every button
 * it returns, BOTH the visible label (`buttonText`) AND the value the frame
 * emits into the scenario binding (`buttonValue`).
 *
 * In the live Farcaster frame / webapp only `buttonText` is ever shown to the
 * user; `buttonValue` is the hidden query value posted as the field binding.
 * Surfacing both is the whole point of this story: it makes the real `1`/`0`
 * rainlang encoding of boolean presets visible and impossible to misrepresent
 * in a screenshot.
 */

const numericField: Field = {
	binding: 'fixed-io',
	name: 'Fixed IO',
	description: 'A numeric field',
	min: 1000,
	presets: [
		{ name: 'Zero preset', value: 0 },
		{ name: 'Thousand preset', value: 1000 }
	]
};

const booleanNamedField: Field = {
	binding: 'is-enabled',
	name: 'Is enabled',
	description: 'A boolean field with named presets',
	presets: [
		{ name: 'Enabled', value: true },
		{ name: 'Disabled', value: false }
	]
};

const booleanUnnamedField: Field = {
	binding: 'is-enabled',
	name: 'Is enabled',
	description: 'A boolean field with unnamed presets',
	// Unnamed presets: no `name`, so the button label falls back to the value.
	presets: [{ value: true }, { value: false }] as unknown as Field['presets']
};

const PresetButtonsPanel = ({ title, field }: { title: string; field: Field }) => {
	// Call the real service function — do not hardcode the expected output.
	const buttons: Button[] = getFieldPresetsButtons(field);
	return (
		<section
			style={{
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
				background: '#ffffff',
				border: '1px solid #e5e7eb',
				borderRadius: 12,
				padding: 20,
				marginBottom: 20,
				maxWidth: 680
			}}
		>
			<h3 style={{ margin: '0 0 4px', fontSize: 16, color: '#111827' }}>{title}</h3>
			<p style={{ margin: '0 0 16px', fontSize: 13, color: '#6b7280' }}>
				<code>getFieldPresetsButtons(field)</code> returned {buttons.length} buttons. Label = what
				the user sees; emitted value = the binding posted by the frame.
			</p>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
				{buttons.map((button, i) => (
					<div
						key={i}
						data-testid={`button-${button.buttonValue}`}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'stretch',
							minWidth: 120
						}}
					>
						<div
							style={{
								background: '#7c3aed',
								color: '#ffffff',
								borderRadius: 8,
								padding: '10px 16px',
								fontSize: 15,
								fontWeight: 600,
								textAlign: 'center'
							}}
						>
							{button.buttonText}
						</div>
						<div
							style={{
								marginTop: 6,
								fontSize: 12,
								color: '#374151',
								textAlign: 'center',
								lineHeight: 1.4
							}}
						>
							<span style={{ color: '#9ca3af' }}>emits</span>{' '}
							<code
								style={{
									background: '#f3f4f6',
									border: '1px solid #e5e7eb',
									borderRadius: 4,
									padding: '1px 6px',
									fontWeight: 600,
									color: '#111827'
								}}
							>
								{button.buttonValue}
							</code>
							<div style={{ color: '#9ca3af', marginTop: 2 }}>→ {button.buttonTarget}</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

const meta: Meta<typeof PresetButtonsPanel> = {
	title: 'Services/getFieldPresetsButtons',
	component: PresetButtonsPanel
};
export default meta;

type Story = StoryObj<typeof PresetButtonsPanel>;

/** Numeric presets (named), plus the "Custom" button emitted when `min` is set. */
export const NumericPresets: Story = {
	args: {
		title: 'Numeric presets (field.min set → Custom button)',
		field: numericField
	}
};

/**
 * Boolean presets WITH names. The label shows the human name (Enabled/Disabled)
 * while the emitted value is rainlang `1` (true) / `0` (false).
 */
export const BooleanNamedPresets: Story = {
	args: {
		title: 'Boolean presets, named (Enabled/Disabled → 1/0)',
		field: booleanNamedField
	}
};

/**
 * Boolean presets WITHOUT names. The label falls back to the boolean literal
 * (true/false) while the emitted value is still rainlang `1` / `0`.
 */
export const BooleanUnnamedPresets: Story = {
	args: {
		title: 'Boolean presets, unnamed (true/false label → 1/0 emitted)',
		field: booleanUnnamedField
	}
};

/**
 * All three representative fields in one view — this is the story captured for
 * the PR screenshot.
 */
export const AllPresets: Story = {
	render: () => (
		<div>
			<PresetButtonsPanel
				title="Numeric presets (field.min set → Custom button)"
				field={numericField}
			/>
			<PresetButtonsPanel
				title="Boolean presets, named (Enabled/Disabled → 1/0)"
				field={booleanNamedField}
			/>
			<PresetButtonsPanel
				title="Boolean presets, unnamed (true/false label → 1/0 emitted)"
				field={booleanUnnamedField}
			/>
		</div>
	)
};
