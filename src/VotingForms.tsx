import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { User } from "./user";
import { updateVote } from "./database";

interface VotingFormsProps {
  votes: { [to: string]: number };
  user: User;
  uid: string;
}

const plus_sign = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="1 1 15 15"
  >
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

const arrow_repeat = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
    <path
      fill-rule="evenodd"
      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
    />
  </svg>
);

const VotingForms = ({ votes, user, uid }: VotingFormsProps) => {
  const initialValues = {
    votes: Object.keys(votes).map((v) => ({
      to: v,
      value: votes[v],
      type: "hidden",
    })),
  };

  const handleSubmit = (values: { votes: any[] }) => {
    const filtered = values.votes
      .filter((v) => v.to !== "")
      .filter((v) => v.value !== 0.0)
      .map((v) => ({ to: v.to, value: parseFloat(v.value) }))
      .filter((v) => !isNaN(v.value));
    let formatted: { [to: string]: number } = {};
    filtered.forEach((v) => (formatted[v.to] = v.value));
    const update = async () => {
      await updateVote(uid, user.name, formatted);
      window.location.reload(true);
    };
    update();
    // window.location.reload(true);
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="p-2 w-3/5">
            <FieldArray name="votes">
              {({ insert, remove, push }) => (
                <div>
                  {values.votes.length > 0 &&
                    values.votes.map((vote, index) => (
                      <div className="grid" key={index}>
                        <div className="col">
                          <Field
                            name={`votes.${index}.to`}
                            placeholder="Option"
                            type={vote.type}
                          />
                          <ErrorMessage
                            name={`votes.${index}.to`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          {vote.type === "hidden" ? (
                            <label htmlFor={`votes.${index}.value`} className="">
                              {vote.to}:
                            </label>
                          ) : (
                            <div></div>
                          )}
                          <Field
                            name={`votes.${index}.value`}
                            placeholder="Option"
                            type="text"
                          />
                          <ErrorMessage
                            name={`votes.${index}.value`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <button type="button" onClick={() => remove(index)}>
                            X
                          </button>
                        </div>
                      </div>
                    ))}

                  <button
                    type="button"
                    className="my-3 px-3 py-2 bg-nord-0 text-nord-4 bg-opacity-90 border rounded font-bold inline-flex items-center hover:bg-nord-0 duration-250 ease-in"
                    onClick={() => push({ to: "", value: "0.0", type: "text" })}
                  >
                    {plus_sign()}
                    <span className="pl-3">Add New Option</span>
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="grid justify-items-end">
              <button
                type="submit"
                className="my-3 px-4 py-3 bg-nord-4 text-nord-0 bg-opacity-90 rounded font-bold inline-flex items-center hover:bg-nord-6 duration-250 ease-in"
              >
                {arrow_repeat()}
                <span className="pl-3">Update vote</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default VotingForms;
