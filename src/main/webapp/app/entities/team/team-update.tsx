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
import { ITeamPlan } from 'app/shared/model/team-plan.model';
import { getEntities as getTeamPlans } from 'app/entities/team-plan/team-plan.reducer';
import { ITeam } from 'app/shared/model/team.model';
import { getEntity, updateEntity, createEntity, reset } from './team.reducer';

export const TeamUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const resources = useAppSelector(state => state.resource.entities);
  const teamPlans = useAppSelector(state => state.teamPlan.entities);
  const teamEntity = useAppSelector(state => state.team.entity);
  const loading = useAppSelector(state => state.team.loading);
  const updating = useAppSelector(state => state.team.updating);
  const updateSuccess = useAppSelector(state => state.team.updateSuccess);

  const handleClose = () => {
    navigate('/team');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getResources({}));
    dispatch(getTeamPlans({}));
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
      ...teamEntity,
      ...values,
      resource: resources.find(it => it.id.toString() === values.resource.toString()),
      teamPlan: teamPlans.find(it => it.id.toString() === values.teamPlan.toString()),
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
          ...teamEntity,
          resource: teamEntity?.resource?.id,
          teamPlan: teamEntity?.teamPlan?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="rosterApplicationmonoApp.team.home.createOrEditLabel" data-cy="TeamCreateUpdateHeading">
            <Translate contentKey="rosterApplicationmonoApp.team.home.createOrEditLabel">Create or edit a Team</Translate>
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
                  id="team-id"
                  label={translate('rosterApplicationmonoApp.team.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('rosterApplicationmonoApp.team.key')} id="team-key" name="key" data-cy="key" type="text" />
              <ValidatedField
                id="team-resource"
                name="resource"
                data-cy="resource"
                label={translate('rosterApplicationmonoApp.team.resource')}
                type="select"
              >
                <option value="" key="0" />
                {resources
                  ? resources.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="team-teamPlan"
                name="teamPlan"
                data-cy="teamPlan"
                label={translate('rosterApplicationmonoApp.team.teamPlan')}
                type="select"
              >
                <option value="" key="0" />
                {teamPlans
                  ? teamPlans.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/team" replace color="info">
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

export default TeamUpdate;
