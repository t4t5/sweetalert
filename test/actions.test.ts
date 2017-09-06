import {
  swal,
  removeSwal,
  $$,
  CLASS_NAMES,
} from './utils';

const { 
  OVERLAY,
  CONFIRM_BUTTON,
  TITLE,
} = CLASS_NAMES;

afterEach(() => removeSwal());

describe("promise value", () => {

  test("dismisses modal by clicking on overlay", async () => {
    expect.assertions(1);

    setTimeout(() => {
      $$(OVERLAY).click();
    }, 500);

    const value = await swal();

    expect(value).toBeNull();
  });

  test("changes value with setActionValue", async () => {

    setTimeout(() => {
      swal.setActionValue("test");
      $$(CONFIRM_BUTTON).click();
    }, 500);

    const value = await swal(); 

    expect(value).toEqual("test");
  });

  test("changes cancel value with setActionValue", async () => {

    setTimeout(() => {
      swal.setActionValue({
        cancel: "test",
      });
      $$(OVERLAY).click();
    }, 500);

    const value = await swal();

    expect(value).toEqual("test");
  });

  /*
   * @TODO!
   *
  test("cannot dismiss if 'clickOutside' is false", async () => {

  });
   */

});

