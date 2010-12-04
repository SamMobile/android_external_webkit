/*
 * Copyright (C) 2004, 2005, 2008 Nikolas Zimmermann <zimmermann@kde.org>
 * Copyright (C) 2004, 2005 Rob Buis <buis@kde.org>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this library; see the file COPYING.LIB.  If not, write to
 * the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA.
 */

#include "config.h"

#if ENABLE(SVG)
#include "SVGTransformList.h"

#include "AffineTransform.h"
#include "SVGSVGElement.h"
#include "SVGTransform.h"
#include <wtf/text/StringConcatenate.h>
#include <wtf/text/StringBuilder.h>

namespace WebCore {

SVGTransform SVGTransformList::createSVGTransformFromMatrix(const SVGMatrix& matrix) const
{
    return SVGSVGElement::createSVGTransformFromMatrix(matrix);
}

SVGTransform SVGTransformList::consolidate()
{
    AffineTransform matrix;
    if (!concatenate(matrix))
        return SVGTransform();

    SVGTransform transform(matrix);
    clear();
    append(transform);
    return transform;
}

bool SVGTransformList::concatenate(AffineTransform& result) const
{
    unsigned size = this->size();
    if (!size)
        return false;

    for (unsigned i = 0; i < size; ++i)
        result = at(i).matrix() * result;

    return true;
}

String SVGTransformList::valueAsString() const
{
    // TODO: We may want to build a real transform string, instead of concatting to a matrix(...).
    AffineTransform matrix;
    concatenate(matrix);

    StringBuilder builder;
    builder.append(makeString("matrix(", String::number(matrix.a()), ' ', String::number(matrix.b()), ' ', String::number(matrix.c()), ' '));
    builder.append(makeString(String::number(matrix.d()), ' ', String::number(matrix.e()), ' ', String::number(matrix.f()), ')'));
    return builder.toString();
}

} // namespace WebCore

#endif // ENABLE(SVG)
