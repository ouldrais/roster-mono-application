import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IResourceTraining } from 'app/shared/model/resource-training.model';
import { getEntities as getResourceTrainings } from 'app/entities/resource-training/resource-training.reducer';
import { IResourcePlan } from 'app/shared/model/resource-plan.model';
import { getEntities as getResourcePlans } from 'app/entities/resource-plan/resource-plan.reducer';
import { ITeam } from 'app/shared/model/team.model';
import { getEntities as getTeams } from 'app/entities/team/team.reducer';
import { IResource } from 'app/shared/model/resource.model';
import { getEntity, updateEntity, createEntity, reset } from './resource.reducer';

export const ResourceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const resourceTrainings = useAppSelector(state => state.resourceTraining.entities);
  const resourcePlans = useAppSelector(state => state.resourcePlan.entities);
  const teams = useAppSelector(state => state.team.entities);
  const resourceEntity = useAppSelector(state => state.resource.entity);
  const loading = useAppSelector(state => state.resource.loading);
  const updating = useAppSelector(state => state.resource.updating);
  const updateSuccess = useAppSelector(state => state.resource.updateSuccess);

  const handleClose = () => {
    navigate('/resource');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getResourceTrainings({}));
    dispatch(getResourcePlans({}));
    dispatch(getTeams({}));
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
      ...resourceEntity,
      ...values,
      resourceTraining: resourceTrainings.find(it => it.id.toString() === values.resourceTraining.toString()),
      resourcePlan: resourcePlans.find(it => it.id.toString() === values.resourcePlan.toString()),
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
          ...resourceEntity,
          resourceTraining: resourceEntity?.resourceTraining?.id,
          resourcePlan: resourceEntity?.resourcePlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.resource.home.createOrEditLabel" data-cy="ResourceCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.resource.home.createOrEditLabel">Create or edit a Resource</Translate>
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
                  id="resource-id"
                  label={translate('rosterApplicationmonoApp.resource.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApplicationmonoApp.resource.key')}
                id="resource-key"
                name="key"
                data-cy="key"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.resource.firstName')}
                id="resource-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.resource.lastName')}
                id="resource-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.resource.teamRole')}
                id="resource-teamRole"
                name="teamRole"
                data-cy="teamRole"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.resource.exchangeAllowed')}
                id="resource-exchangeAllowed"
                name="exchangeAllowed"
                data-cy="exchangeAllowed"
                check
                type="checkbox"
              />
              <ValidatedField
                id="resource-resourceTraining"
                name="resourceTraining"
                data-cy="resourceTraining"
                label={translate('rosterApplicationmonoApp.resource.resourceTraining')}
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
              <ValidatedField
                id="resource-resourcePlan"
                name="resourcePlan"
                data-cy="resourcePlan"
                label={translate('rosterApplicationmonoApp.resource.resourcePlan')}
                type="select"
              >
                <option value="" key="0" />
                {resourcePlans
                  ? resourcePlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/resource" replace color="info">
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

export default ResourceUpdate;
