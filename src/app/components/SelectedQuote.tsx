'use client';

export default function SelectedQuote({
  selectedQuote,
}: {
  selectedQuote: any;
}) {
  return (
    <div className="quote">
      <h3>Quote:</h3>
      <span className="quoted-text">
        {selectedQuote && selectedQuote.dialog}
      </span>
    </div>
  );
}
