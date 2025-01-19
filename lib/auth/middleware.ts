import { z } from "zod";

export type ActionState = {
    error?: string;
    success?: string;
    [key: string]: any;
};

type ValidateActionFunc<T extends z.ZodType<any, any>, U> = (
    data: z.infer<T>,
    formData: FormData
) => Promise<U>;

export function validateAction<T extends z.ZodType<any, any>, U>(
    schema: T,
    actionFn: ValidateActionFunc<T, U>
) {
    return async (prevState: ActionState, formData: FormData): Promise<U> => {
        const result = schema.safeParse(Object.fromEntries(formData));
        console.log({ result, prevState, formData });

        if (!result.success) {
            return {
                error: result.error.errors[0].message,
            } as U;
        }

        return actionFn(result.data, formData);
    };
}
