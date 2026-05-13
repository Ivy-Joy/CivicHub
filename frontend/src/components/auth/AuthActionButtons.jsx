import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';

export default function AuthActionButtons({
  primaryText,
  loading,
  disabled,
  onPrimary,
  secondaryText,
  onSecondary,
}) {
  return (
    <div className="d-grid gap-2">
      <Button size="lg" disabled={loading || disabled} onClick={onPrimary}>
        {loading ? (
          <>
            <Spinner size="sm" className="me-2" />
            Saving...
          </>
        ) : (
          <>
            {primaryText}
            <ArrowRight className="ms-2" />
          </>
        )}
      </Button>

      {secondaryText ? (
        <Button variant="outline-primary" size="lg" onClick={onSecondary} type="button">
          {secondaryText}
        </Button>
      ) : null}
    </div>
  );
}