import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import { useRef } from 'react';

const RecipeSteps = ({ ...props }) => {
  const lastIdRef = useRef(props.value[props.value.length - 1].id);
  const addStep = () => {
    if (props.value[props.value.length - 1].text !== '') {
      const newId = lastIdRef.current + 1;
      props.onChange([...props.value, { id: newId, text: '' }]);
      lastIdRef.current = newId;
    }
  };
  const handleStepChange = (id: number, newText: string) => {
    props.onChange(
      props.value.map((step: any) =>
        step.id === id ? { ...step, text: newText } : step
      )
    );
  };
  const handleStepDelete = (id: number) => {
    if (props.value.length !== 1) {
      props.onChange(props.value.filter((step: any) => step.id !== id));
    }
  };
  return (
    <div className="w-full border-2 rounded p-2 space-y-2">
      <div className="space-y-2">
        {props.value.map((step: any, index: any) => (
          <div
            key={step.id}
            className="bg-gray-200 p-4 rounded items-center space-y-2"
          >
            <div className="font-medium flex justify-between">
              <span>Etape {index + 1}</span>{' '}
              <XCircleIcon
                className="h-6 w-6 cursor-pointer text-red-600"
                onClick={() => handleStepDelete(step.id)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Textarea
                defaultValue={step.text}
                onChange={(e) => handleStepChange(step.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="ghost" size="icon" type="button" onClick={addStep}>
          <PlusIcon className="h-6 w-6 cursor-pointer" />
        </Button>
      </div>
    </div>
  );
};

export default RecipeSteps;
