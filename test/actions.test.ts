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

    console.log(value);

    expect(value).toBeNull();
  });

  test("cannot dismiss if 'clickOutside' is false", async () => {
    expect.assertions(1);

    setTimeout(() => {
      $$(OVERLAY).click();
    }, 500);

    const value = await swal({
      clickOutside: false,
    });

    console.log(value);

    expect(value).toBeNull();
  });

});
