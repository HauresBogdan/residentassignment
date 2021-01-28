export default function SubmitButton({ handleSubmit }) {
  return (
    <button
      className="submit-btn"
      type="submit"
      onClick={handleSubmit}
      value="SAVE"
    >
      SAVE
    </button>
  );
}
