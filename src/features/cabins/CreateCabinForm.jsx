/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useUpdateCabin } from "./useUpdateCabin";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState, control } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isUpdating || isCreating;
  const onSubmit = (data) => {
    if (!editId)
      return createCabin(data, {
        onSuccess: () => {
          onCloseModal?.();
          reset();
        },
      });
    updateCabin(
      { newCabinData: data, id: editId },
      {
        onSuccess: () => {
          onCloseModal?.();
          reset();
        },
      }
    );
  };
  return (
    <Form
      type={`${onCloseModal ? `modal` : `regular`}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: isEditSession ? false : "Name is require",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: isEditSession ? false : "Max capacity is require",
            min: 1,
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: isEditSession ? false : "Regular price is require",
            min: 1,
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: isEditSession ? false : "Discount is require",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: isEditSession ? false : "Description is required",
          })}
        />
      </FormRow>

      <Controller
        name="image"
        control={control}
        rules={{ required: !isEditSession }}
        render={({ field }) => (
          <>
            <FormRow label="Cabin photo">
              <FileInput
                id="image"
                accept="image/*"
                onChange={(e) => field.onChange(e.target.files[0])}
              />
            </FormRow>
          </>
        )}
      />

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Update cabin" : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
