import { render, screen, fireEvent, within } from '@testing-library/react';
import CustomSelect from '../CustomSelect';

describe('CustomSelect component', () => {
  const setOpenSelect = jest.fn();
  const setSelectedOption = jest.fn();

  it('Should have the given class', () => {
    const { container } = render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={false}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    // eslint-disable-next-line testing-library/no-node-access
    const customSelect = container.firstChild;
    expect(customSelect).toHaveClass('custom-select-class');
  });

  it('Should have the given label', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={false}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectCombobox = screen.getByRole('combobox');
    expect(CustomSelectCombobox).toHaveAccessibleName('custom-select-label');
  });

  it('Should have the given options', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={false}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectOptions = screen.getAllByRole('option');
    expect(CustomSelectOptions).toHaveLength(3);
  });

  it('Should have the given combobox id', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={false}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectCombobox = screen.getByRole('combobox');
    expect(CustomSelectCombobox).toHaveAttribute('id', 'combobox-id');
  });

  it('Should have the given listbox id', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={false}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectListbox = screen.getByRole('listbox');
    expect(CustomSelectListbox).toHaveAttribute('id', 'listbox-id');
  });

  it('Should hide the select options when openSelect is false', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={false}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectListbox = screen.getByRole('listbox');
    expect(CustomSelectListbox).not.toHaveClass('show-select');
  });

  it('Should show the options list when openSelect is true', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={true}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectListbox = screen.getByRole('listbox');
    expect(CustomSelectListbox).toHaveClass('show-select');
  });

  it('Should call the setOpenSelect function when the open select button is clicked', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={true}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const openSelectButton = screen.getByRole('button', {
      name: /open select options/i,
    });
    fireEvent.click(openSelectButton);
    expect(setOpenSelect).toHaveBeenCalledTimes(1);
  });

  it('Should have a combobox input with the given value', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={false}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectCombobox = screen.getByRole('combobox', {
      name: /custom-select-label/i,
    });
    expect(CustomSelectCombobox).toHaveValue('1');
  });

  it('Should call the setSelectedOption function when the option is clicked', () => {
    render(
      <CustomSelect
        customSelectClass={'custom-select-class'}
        label={'custom-select-label'}
        options={[1, 2, 3]}
        comboboxId={'combobox-id'}
        listboxId={'listbox-id'}
        openSelect={true}
        setOpenSelect={setOpenSelect}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    );
    const CustomSelectOptions = screen.getAllByRole('option');

    CustomSelectOptions.forEach((CustomSelectOption) => {
      fireEvent.click(within(CustomSelectOption).getByRole('button'));
      expect(setSelectedOption).toHaveBeenCalled();
    });
  });
});
