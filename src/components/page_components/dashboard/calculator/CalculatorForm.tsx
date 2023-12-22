import Button from "@/components/buttons";
import { CheckBox } from "@/components/buttons/CheckBox";
import { RegularTextInput } from "@/components/input/RegularTextInput";

type FormItemProps = {
  name: string;
  limit?: number;
  keyboardType?: "default" | "number";
};

type CalculatorFormProps = {
  calculate?: () => void
}

const FormItem = (props: FormItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-sm">{props.name}</p>
      <RegularTextInput
        maxLength={props.limit}
        onKeyPress={(event) => {
          if (props.keyboardType == "number") {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          } else return undefined;
        }}
      />
    </div>
  );
};

export const CalculatorForm = (props: CalculatorFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      <form className="flex flex-col gap-3">
        <FormItem name="Pickup Address" />
        <FormItem name="Dropoff Address" />
        <FormItem keyboardType="number" name="Weight (kg)" />

        <div className="flex justify-between items-center">
          <FormItem keyboardType="number" name="Length" />
          <FormItem keyboardType="number" name="Height" />
          <FormItem keyboardType="number" name="Width" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold text-sm">Fragile</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckBox />
              <p>Yes</p>
            </div>

            <div className="flex items-center gap-2">
              <CheckBox />
              <p>No</p>
            </div>
          </div>
        </div>
      </form>

      <Button onClick={props.calculate} variant="contained">Calculate</Button>
    </div>
  );
};
