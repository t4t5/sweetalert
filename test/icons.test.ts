import {
  swal,
  $$,
  CLASS_NAMES,
  removeSwal,
} from './utils';

const { 
  ICON,
} = CLASS_NAMES;

afterEach(() => removeSwal());

describe("show icons", () => {

  test("shows icon depending on third argument", () => {
    swal("Error", "An error occurred!", "error");

    expect($$(ICON).length).toBe(1);
    expect($$(ICON).hasClass(`${ICON}--error`)).toBeTruthy();
  });

  test("shows icon when using 'icon' object key", () => {
    swal({
      icon: 'warning',
    });

    expect($$(ICON).length).toBe(1);
    expect($$(ICON).hasClass(`${ICON}--warning`)).toBeTruthy();
  });

  test("hides icon when setting 'icon' key to 'false'", () => {
    swal({
      icon: false,
    });

    expect($$(ICON).length).toBe(0);
  });

});

