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
import { IResourcePlan } from 'app/shared/model/resource-plan.model';
import { getEntities as getResourcePlans } from 'app/entities/resource-plan/resource-plan.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { IPosition } from 'app/shared/model/position.model';
import { getEntity, updateEntity, createEntity, reset } from './position.reducer';

export const PositionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const positionRequirements = useAppSelector(state => state.positionRequirement.entities);
  const resourcePlans = useAppSelector(state => state.resourcePlan.entities);
  const departments = useAppSelector(state => state.department.entities);
  const positionEntity = useAppSelector(state => state.position.entity);
  const loading = useAppSelector(state => state.position.loading);
  const updating = useAppSelector(state => state.position.updating);
  const updateSuccess = useAppSelector(state => state.position.updateSuccess);

  const handleClose = () => {
    navigate('/position');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPositionRequirements({}));
    dispatch(getResourcePlans({}));
    dispatch(getDepartments({}));
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
      ...positionEntity,
      ...values,
      positionRequirement: positionRequirements.find(it => it.id.toString() === values.positionRequirement.toString()),
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
          ...positionEntity,
          positionRequirement: positionEntity?.positionRequirement?.id,
          resourcePlan: positionEntity?.resourcePlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.position.home.createOrEditLabel" data-cy="PositionCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.position.home.createOrEditLabel">Create or edit a Position</Translate>
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
                  id="position-id"
                  label={translate('rosterApplicationmonoApp.position.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('rosterApplicationmonoApp.position.key')}
                id="position-key"
                name="key"
                data-cy="key"
                type="text"
              />
              <ValidatedField
                label={translate('rosterApplicationmonoApp.position.leadership')}
                id="position-leadership"
                name="leadership"
                data-cy="leadership"
                type="text"
              />
              <ValidatedField
                id="position-positionRequirement"
                name="positionRequirement"
                data-cy="positionRequirement"
                label={translate('rosterApplicationmonoApp.position.positionRequirement')}
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
                id="position-resourcePlan"
                name="resourcePlan"
                data-cy="resourcePlan"
                label={translate('rosterApplicationmonoApp.position.resourcePlan')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/position" replace color="info">
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

export default PositionUpdate;
