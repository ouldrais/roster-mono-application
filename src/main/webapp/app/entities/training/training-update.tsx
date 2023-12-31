import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPositionRequirement } from 'app/shared/model/position-requirement.model';
import { getEntities as getPositionRequirements } from 'app/entities/position-requirement/position-requirement.reducer';
import { IResourceTraining } from 'app/shared/model/resource-training.model';
import { getEntities as getResourceTrainings } from 'app/entities/resource-training/resource-training.reducer';
import { ITraining } from 'app/shared/model/training.model';
import { getEntity, updateEntity, createEntity, reset } from './training.reducer';

export const TrainingUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const positionRequirements = useAppSelector(state => state.positionRequirement.entities);
  const resourceTrainings = useAppSelector(state => state.resourceTraining.entities);
  const trainingEntity = useAppSelector(state => state.training.entity);
  const loading = useAppSelector(state => state.training.loading);
  const updating = useAppSelector(state => state.training.updating);
  const updateSuccess = useAppSelector(state => state.training.updateSuccess);

  const handleClose = () => {
    navigate('/training');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPositionRequirements({}));
    dispatch(getResourceTrainings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.key !== undefined && typeof values.key !== 'number') {
      values.key = Number(values.key);
    }
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...trainingEntity,
      ...values,
      positionRequirement: positionRequirements.find(it => it.id.toString() === values.positionRequirement.toString()),
      resourceTraining: resourceTrainings.find(it => it.id.toString() === values.resourceTraining.toString()),
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
          ...trainingEntity,
          positionRequirement: trainingEntity?.positionRequirement?.id,
          resourceTraining: trainingEntity?.resourceTraining?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.training.home.createOrEditLabel" data-cy="TrainingCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.training.home.createOrEditLabel">Create or edit a Training</Translate>
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
                  id="training-id"
                  label={translate('rosterApplicationmonoApp.training.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApplicationmonoApp.training.key')}
                id="training-key"
                name="key"
                data-cy="key"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.training.description')}
                id="training-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                id="training-positionRequirement"
                name="positionRequirement"
                data-cy="positionRequirement"
                label={translate('rosterApplicationmonoApp.training.positionRequirement')}
                type="select"
              >
                <option value="" key="0" />
                {positionRequirements
                  ? positionRequirements.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="training-resourceTraining"
                name="resourceTraining"
                data-cy="resourceTraining"
                label={translate('rosterApplicationmonoApp.training.resourceTraining')}
                type="select"
              >
                <option value="" key="0" />
                {resourceTrainings
                  ? resourceTrainings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/training" replace color="info">
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

export default TrainingUpdate;
