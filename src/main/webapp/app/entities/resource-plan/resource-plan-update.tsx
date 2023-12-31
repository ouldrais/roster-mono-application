import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IResource } from 'app/shared/model/resource.model';
import { getEntities as getResources } from 'app/entities/resource/resource.reducer';
import { IPosition } from 'app/shared/model/position.model';
import { getEntities as getPositions } from 'app/entities/position/position.reducer';
import { IShift } from 'app/shared/model/shift.model';
import { getEntities as getShifts } from 'app/entities/shift/shift.reducer';
import { IResourcePlan } from 'app/shared/model/resource-plan.model';
import { getEntity, updateEntity, createEntity, reset } from './resource-plan.reducer';

export const ResourcePlanUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const resources = useAppSelector(state => state.resource.entities);
  const positions = useAppSelector(state => state.position.entities);
  const shifts = useAppSelector(state => state.shift.entities);
  const resourcePlanEntity = useAppSelector(state => state.resourcePlan.entity);
  const loading = useAppSelector(state => state.resourcePlan.loading);
  const updating = useAppSelector(state => state.resourcePlan.updating);
  const updateSuccess = useAppSelector(state => state.resourcePlan.updateSuccess);

  const handleClose = () => {
    navigate('/resource-plan');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getResources({}));
    dispatch(getPositions({}));
    dispatch(getShifts({}));
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
      ...resourcePlanEntity,
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
          ...resourcePlanEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.resourcePlan.home.createOrEditLabel" data-cy="ResourcePlanCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.resourcePlan.home.createOrEditLabel">Create or edit a ResourcePlan</Translate>
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
                  id="resource-plan-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApplicationmonoApp.resourcePlan.availability')}
                id="resource-plan-availability"
                name="availability"
                data-cy="availability"
                check
                type="checkbox"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/resource-plan" replace color="info">
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

export default ResourcePlanUpdate;
