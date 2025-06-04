export const validateRoadmapName = (value) => {
  if (!value || value.trim() === "") {
    return "Roadmap name is required";
  }
  if (value !== value.trim()) {
    return "Roadmap name should not contain leading or trailing spaces";
  }
  return "";
};

export const validateMetaDataType = (value) => {
  if (!value) {
    return "Please select a metadata type";
  }
  return "";
};

export const validateMetaDataTag = (value) => {
  if (!value || value.length === 0) {
    return "Please select at least one metadata tag";
  }
  return "";
};

export const validateTile = (tile) => {
  const tileErrors = {};

  if (!tile.tileName || tile.tileName.trim() === "") {
    tileErrors.tileName = "Tile name is required";
  } else if (tile.tileName !== tile.tileName.trim()) {
    tileErrors.tileName = "Tile name should not contain leading or trailing spaces";
  }

  if (!tile.contentType) {
    tileErrors.contentType = "Please select a content type";
  }

  if (!tile.contentLibraryId) {
    tileErrors.contentLibraryId = "Please select content";
  }

  if (!tile.points) {
    tileErrors.points = "Coins are required";
  } else {
    const points = parseInt(tile.points);
    if (isNaN(points)) {
      tileErrors.points = "Coins must be a number";
    } else if (points < 1) {
      tileErrors.points = "Coins must be at least 1";
    } else if (points > 999) {
      tileErrors.points = "Coins cannot exceed 999";
    } else if (!Number.isInteger(points)) {
      tileErrors.points = "Coins must be a whole number";
    } else if (tile.points !== tile.points.trim()) {
      tileErrors.points = "Coins should not contain leading or trailing spaces";
    }
  }

  if (!tile.time) {
    tileErrors.time = "Time is required";
  } else {
    const time = parseInt(tile.time);
    if (isNaN(time)) {
      tileErrors.time = "Time must be a number";
    } else if (time < 1) {
      tileErrors.time = "Time must be at least 1 minute";
    } else if (time > 180) {
      tileErrors.time = "Time cannot exceed 180 minutes (3 hours)";
    } else if (!Number.isInteger(time)) {
      tileErrors.time = "Time must be a whole number";
    } else if (tile.time !== tile.time.trim()) {
      tileErrors.time = "Time should not contain leading or trailing spaces";
    }
  }

  if (!tile.description || tile.description.trim() === "") {
    tileErrors.description = "Description is required";
  } else {
    const trimmedDescription = tile.description.trim();
    const charCount = trimmedDescription.length;
    if (charCount < 10) {
      tileErrors.description = "Description must contain at least 10 characters";
    } else if (charCount > 500) {
      tileErrors.description = "Description must not exceed 500 characters";
    }
  }

  return tileErrors;
};

export const validateAllFields = (state, selectedMetaDataType, selectedTags, tiles) => {
  const newErrors = {
    roadmapName: validateRoadmapName(state.roadmapName),
    metaDataType: validateMetaDataType(selectedMetaDataType),
    metaDataTag: validateMetaDataTag(selectedTags),
    tiles: tiles.map(tile => validateTile(tile))
  };

  const hasErrors = 
    newErrors.roadmapName || 
    newErrors.metaDataType || 
    newErrors.metaDataTag || 
    newErrors.tiles.some(tileErrors => Object.keys(tileErrors).length > 0);

  return { newErrors, isValid: !hasErrors };
};
