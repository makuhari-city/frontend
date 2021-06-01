import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { User } from "./user";
import {updateVote} from "./database";

interface VotingFormsProps {
  votes: { [to: string]: number };
  user: User;
  uid: string;
}

const VotingForms = ({ votes, user, uid }: VotingFormsProps) => {

  const initialValues = {
    votes: Object.keys(votes).map((v) => ({ to: v, value: votes[v] })),
  };

  const handleSubmit = (values: { votes: any[] }) => {
    const filtered = values.votes
      .filter((v) => v.to !== "")
      .filter((v) => v.value !== 0.0)
	  .map(v=>({to:v.to, value:parseFloat(v.value)}))
	  .filter(v=>!isNaN(v.value));
    let formatted: { [to: string]: number } = {};
    filtered.forEach((v) => (formatted[v.to] = v.value));
	const update = async ()=>{
		await updateVote(uid, user.name, formatted);
		window.location.reload(true);
	}
	update();
	// window.location.reload(true);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <FieldArray name="votes">
              {({ insert, remove, push }) => (
                <div>
                  {values.votes.length > 0 &&
                    values.votes.map((vote, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`votes.${index}.to`}>To</label>
                          <Field
                            name={`votes.${index}.to`}
                            placeholder="Option"
                            type="text"
                          />
                          <ErrorMessage
                            name={`votes.${index}.to`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`votes.${index}.value`}>Value</label>
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
                    className="secondary"
                    onClick={() => push({ to: "", value: "0.0" })}
                  >
                    Add Option
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">update vote</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VotingForms;
