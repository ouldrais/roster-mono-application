import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITraining } from 'app/shared/model/training.model';
import { getEntities as getTrainings } from 'app/entities/training/training.reducer';
import { IPosition } from 'app/shared/model/position.model';
import { getEntities as getPositions } from 'app/entities/position/position.reducer';
import { IPositionRequirement } from 'app/shared/model/position-requirement.model';
import { getEntity, updateEntity, createEntity, reset } from './position-requirement.reducer';

export const PositionRequirementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const trainings = useAppSelector(state => state.training.entities);
  const positions = useAppSelector(state => state.position.entities);
  const positionRequirementEntity = useAppSelector(state => state.positionRequirement.entity);
  const loading = useAppSelector(state => state.positionRequirement.loading);
  const updating = useAppSelector(state => state.positionRequirement.updating);
  const updateSuccess = useAppSelector(state => state.positionRequirement.updateSuccess);

  const handleClose = () => {
    navigate('/position-requirement');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTrainings({}));
    dispatch(getPositions({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...positionRequirementEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...positionRequirementEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.positionRequirement.home.createOrEditLabel" data-cy="PositionRequirementCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.positionRequirement.home.createOrEditLabel">
              Create or edit a PositionRequirement
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="position-requirement-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApplicationmonoApp.positionRequirement.mandatoty')}
                id="position-requirement-mandatoty"
                name="mandatoty"
                data-cy="mandatoty"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/position-requirement" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PositionRequirementUpdate;
