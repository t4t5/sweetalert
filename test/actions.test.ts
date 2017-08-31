import {
  swal,
  removeSwal,
  $$,
  CLASS_NAMES,
} from './utils';

const { 
  OVERLAY,
} = CLASS_NAMES;

afterEach(() => removeSwal());

describe("dismiss modal", () => {

  test("dismisses modal by clicking on overlay", async () => {
    expect.assertions(1);

    setTimeout(() => {
      $$(OVERLAY).click();
    }, 500);

    const value = await swal();

    expect(value).toBeNull();
  });

  /*
   * @TODO!
   *
  test("cannot dismiss if 'clickOutside' is false", async () => {

  });
   */

});
